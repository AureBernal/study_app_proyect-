const {sequelize} = require("../connection");
const {TopicsModel} = require("../model/topics.model");

const listar = async function(textBuscar , pagina , limite) {
  console.log("listar topicos");
  try{
      const topics = await sequelize.query( `SELECT * 
                  FROM topics 
                  WHERE 1=1
                  AND UPPER(name) LIKE UPPER('%${textBuscar}%')
                  ORDER BY id` );
      if(topics){
          //En users [0] se encuentra el listado de lo que se recupera del sql
          return topics[0]
      }else{
          return []
      }
  }catch(error){
      console.log(error);
      throw error;
  }    
};  

const consultarPorCodigo = async function(id) {
  console.log("consultar topicos");
  
  try{
      const topicsModelResult = await TopicsModel.findByPk(id);
      
      if(topicsModelResult){
          //En users [0] se encuentra el listado de lo que se recupera del sql
          return topicsModelResult;
      }else{
          return[]
      }

  }catch(error){
      console.log(error);
      throw error;
  }    
}  

const actualizar = async function(id , create_date , name , topics_id , order , priority , color , owner_user_id ) {
  console.log("actualizar topicos");
  let topicosRetorno=null; //GUARDARA EL topico QUE SE VA A INCLUIR O EDITAR
  //const data =req.body; // SE OBTIENE LOS DATOS DEL CUERPO DE LA PETICION
 // const id=req.body.id; // ID PASADO
 const data = {id , create_date , name , topics_id , order , priority , color , owner_user_id};
 try {
      let tpcExiste=null;
      if(id){
        tpcExiste=  await TopicsModel.findByPk(id);
      }
      if(tpcExiste){
          //asegura que el usuario existe, entonces actualiza 
          topicosRetorno = await TopicsModel.update(data, {where: {id : id}});
          topicosRetorno = data
      }else{
          //incluir
          topicosRetorno = await TopicsModel.create(data)
      }
      return topicosRetorno;
  } catch (error) {
      console.log(error);
      throw error;
  }    
};

const eliminar = async function(id) {
  console.log("eliminar topics");
  
  try {
      await TopicsModel.destroy({where: {id : id}});
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
};