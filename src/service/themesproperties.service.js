const { sequelize } = require("../connection");
const { ThemesPropertiesModel } = require("../model/themesproperties.model")

const listar = async function(numeroBuscar) {
  console.log("listar themes properties");
  try{
      const themesproperties = await sequelize.query( `SELECT * 
                  FROM themes_properties 
                  WHERE themes_id = ${numeroBuscar}
                  ORDER BY id` );
      if(themesproperties){
          return themesproperties
      }else{
          return []
      }
  }catch(error){
      console.log(error);
      throw error;
  }     
};

  const consultarPorCodigo = async function(id) {
    console.log("consultar temas propiedades");
  
    try {
      const temasPropiedadesModelResult = await ThemesPropertiesModel.findByPk(
        id
      ) 
      if (temasPropiedadesModelResult) {
        return temasPropiedadesModelResult;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  const actualizar = async function( id, themes_id, property_name, property_value) {
    console.log("actualizar temas propiedades");
    let temaPropiedadRetorno = null;
  
    const data = { id, themes_id, property_name, property_value };
  
    try {
      let temaPropiedadExiste = null;
      if (id) {
        temaPropiedadExiste = await ThemesPropertiesModel.findByPk(id);
      }
      if (temaPropiedadExiste) {
        temaPropiedadRetorno = await ThemesPropertiesModel.update(data, {where: { id: id }});
        temaPropiedadRetorno = data;
      } else {
        temaPropiedadRetorno = await ThemesPropertiesModel.create(data);
      }
      return temaPropiedadRetorno;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  const eliminar = async function(id) {
    console.log("eliminar temas propiedades");
    try {
      await ThemesPropertiesModel.destroy({ where: { id: id } });
      return true;
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = {
    listar,
    consultarPorCodigo,
    actualizar,
    eliminar
  };