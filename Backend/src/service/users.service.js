const {sequelize} = require ("../connection");
const {UserModel} = require ("../model/user.model");

const listar = async function(textBuscar , pagina , limite) {
    console.log("listar usuarios");
    try{
        const users = await sequelize.query( `SELECT * 
                    FROM users 
                    WHERE 1=1
                    AND UPPER(name) LIKE UPPER('%${textBuscar}%')
                    AND deleted is false
                    ORDER BY id` );
        if(users && users[0]){
            //En users [0] se encuentra el listado de lo que se recupera del sql
            return users[0]
        }else{
            return []
        }
    }catch(error){
        console.log(error);
        throw error;
    }    
};   

const consultarPorCodigo = async function(id) {
    console.log("consultar usuarios");
    
    try{
        const userModelResult = await UserModel.findByPk(id);
        
        if(userModelResult){
            //En users [0] se encuentra el listado de lo que se recupera del sql
            return userModelResult;
        }else{
            return[]
        }

    }catch(error){
        console.log(error);
        throw error;
    }    
}   

const actualizar = async function(id, name , last_name , avatar , email , password , deleted ) {
    console.log("actualizar usuarios");
    let usuarioRetorno=null; //GUARDARA EL USARIO QUE SE VA A INCLUIR O EDITAR
    //const data =req.body; // SE OBTIENE LOS DATOS DEL CUERPO DE LA PETICION
   // const id=req.body.id; // ID PASADO
   const data = {id, name , last_name , avatar , email , password , deleted};
   try {
        let usrExiste=null;
        if(id){
            usrExiste=  await UserModel.findByPk(id);
        }
        if(usrExiste){
            //asegura que el usuario existe, entonces actualiza 
            usuarioRetorno = await UserModel.update(data, {where: {id : id}});
            usuarioRetorno = data
        }else{
            //incluir
            usuarioRetorno = await UserModel.create(data)
        }
        return usuarioRetorno;
    } catch (error) {
        console.log(error);
        throw error;
    }    
};

const eliminar = async function(id) {
    console.log("eliminar usuarios");
    
    try {
        await UserModel.update({deleted: true},{where: {id : id}});
        return true;
    } catch(error) {
        throw error;
    }
};
module.exports = {
    listar, 
    consultarPorCodigo,
    actualizar, 
    eliminar
};