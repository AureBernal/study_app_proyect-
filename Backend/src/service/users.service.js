const { SELECT, INSERT, UPDATE } = require("sequelize");
const {sequelize} = require ("../connection");
const {UserModel} = require ("../model/user.model");
const jwt = require('jsonwebtoken');

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
const login = async (data) => {
    console.log("login de usuarios service");
  
    try {
    
      //validar usuario
      let userResult = await sequelize.query(
        `SELECT id, name, token FROM users 
          WHERE 1=1
            AND deleted is FALSE
            AND name = :n
            AND password = :p LIMIT 1`, {
          replacements: {
            n: data.username,
            p: data.password
          }
        }
      );
      
      if(userResult[0] && userResult[0].length > 0){
        
        if(userResult[0][0].token && userResult[0][0].token !=''){
        
          return {
            token: userResult[0][0].token
          }
        }else {
          const payload = {
            username: data.username,
            id: userResult[0][0].id
          }
          
          // generar token
          var token = jwt.sign(payload, '12355448');
  
          //guardar token
          await UserModel.update( { token: token }, { where: { id: payload.id } });
        }
      }else{
        throw new Error("Datos invalidos");
      }
  
      return {
        token
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const logout = async (usuarioID) => {

    console.log("cerrar sesion service", usuarioID);
  
    try {
      
      //borrar token
      await UserModel.update( { token: null }, { where: { id: usuarioID } });
      return;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

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
    eliminar,
    login,
    logout
};