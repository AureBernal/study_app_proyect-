const { sequelize } = require("../connection");
const { ThemesModel } = require("../model/themes.model");

const listar = async function(textBuscar, pagina, limite) {
  console.log("listar temas");
  try {
    const temas = await sequelize.query(
      `SELECT * FROM themes WHERE 1=1 AND UPPER(name) LIKE UPPER('%${textBuscar}%') ORDER BY id`
    );
    if (temas) {
      return temas[0];
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const consultarPorCodigo = async function(id) {
  console.log("consultar temas");

  try {
    const temasModelResult = await ThemesModel.findByPk(id);

    if (temasModelResult) {
      return temasModelResult;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const actualizar = async function( id, create_date, name, descripcion, keywords, owner_user_id){
  console.log("actualizar temas");
  let temaRetorno = null;

  const data = { id, create_date, name, descripcion, keywords, owner_user_id};

  try {
    let temaExiste = null;
    if (id) {
      temaExiste = await ThemesModel.findByPk(id);
    }
    if (temaExiste) {
      temaRetorno = await ThemesModel.update(data, { where: { id: id } });
      temaRetorno = data;
    } else {
      temaRetorno = await ThemesModel.create(data);
    }
    return temaRetorno;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const eliminar = async function(id) {
  console.log("eliminar temas");

  try {
    await ThemesModel.destroy({ where: { id: id } });
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