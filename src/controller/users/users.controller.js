const {sequelize} = require ("../../connection");
const {UserModel} = require ("../../model/user.model");
const Userservice = require ("../../service/users.service")

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
    eliminar
};