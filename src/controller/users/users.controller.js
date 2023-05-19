const {sequelize} = require ("../../connection");
const {UserModel} = require ("../../model/user.model");
const Userservice = require ("../../service/users.service");
const jwt= require("jsonwebtoken");

const listar = async function(req, res) {
    console.log("listar usuarios");
    try{
        const users = await Userservice.listar(req.query.filtro || '');
        
        if(users){
            //En users [0] se encuentra el listado de lo que se recupera del sql
            res.json({
                success: true,
                usuarios:users[0]
        })
        }else{
            res.json({
                success: true,
                usuarios:[]
            })
            
        }
    }catch(error){
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }    
};   

const consultarPorCodigo = async function(req, res) {
    console.log("consultar usuarios");
    const id = req.params.id;

    try{
        const userModelResult = await Userservice.consultarPorCodigo(req.query.id || '');
        
        if(userModelResult){
            //En users [0] se encuentra el listado de lo que se recupera del sql
            res.json({
                success: true,
                usuarios:userModelResult
        })
        }else{
            res.json({
                success: true,
                usuarios:null
            })
            
        }
    }catch(error){
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }    
}   

const actualizar = async function(req, res) {
    console.log("actualizar usuarios");
    let usuarioRetorno=null; //GUARDARA EL USARIO QUE SE VA A INCLUIR O EDITAR
    const data =req.body; // SE OBTIENE LOS DATOS DEL CUERPO DE LA PETICION
    const id=req.body.id; // ID PASADO
   try {
        usuarioRetorno = await Userservice.actualizar(req.body.id, 
                                                      req.body.name , 
                                                      req.body.last_name , 
                                                      req.body.avatar , 
                                                      req.body.email , 
                                                      req.body.password , 
                                                      req.body.deleted )
    
        res.json({
            success: true,
            user: usuarioRetorno
        });
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            usuarios: error.message
        });
    }    
};

const login = async function (req, res){
    console.log("Login usuario")
    try {
        //busca en la base de datos el usuario con el correo electronico y contraseña propporcionados
        const usersDB = await sequelize.query
        ("SELECT * FROM users WHERE email = '"+req.body.email + "'AND password= '" + req.body.password+ "'" );
        console.log("users",usersDB);
        let user= null;
        //verifica si se encontraron resultados en la consulta a la base de datos y asignar el primer resultado a la variable "users"
        if (usersDB.length > 0 && usersDB[0].length > 0){
            user=usersDB[0][0]; 
            if (user.token){
                res.json({
                    success: false,
                    error: "Usuario ya esta autenticado"
                })
                return;
            }
            let token = jwt.sign({
                codigo: user.codigo,
                name: user.name,
                last_name: user.last_name,
                avatar: user.avatar,
                email: user.email,
            },'passwd'); // actualiza el registro del ususario en la base de datos con el token generado
            const userDBupdate = await sequelize.query("UPDATE users SET token= '"+ token + "' WHERE id= "+ user.id)
            res.json({
                success: true,
                token
            })

        }else{
            //si no se encuentra el usuario en la base de datos, devolver la respuesta con el mensaje de error correspondiente
            res.json({
                success:false,
                error: "usuario no encontrado"
            })
        }
    } catch (error) {
        //si ocurre un error, devolver la respuesta con el mensaje de error
        res.json({
            success:false,
            error: error.message
        })
    }
}

const logout = async function (req, res){
    try{
        const usersDB = await sequelize.query("UPDATE user SET token = null WHERE id = "+ req.locals.userId+"");
    }catch{

        console.log(error);
        req.json({
            success: false,
            error: error.message
        });
    }
};

const eliminar = async function(req, res) {
    console.log("eliminar usuarios");
    try {
        await Userservice.eliminar(req.query.id || '');
        res.json({
            success: true,
       });
    } catch(error) {
        res.json({
             success: false,
             error: error.message    
        });
    }
};

module.exports = {
    listar, 
    consultarPorCodigo,
    actualizar, 
    eliminar,
    login,
    logout
};