const {sequelize} = require ("../../connection");
const ThemesPropertiesService = require ("../../service/themesproperties.service");

const listar = async function(req, res) {
  console.log("listar temas y propiedades");
  try {
    const temasProperties = await ThemesPropertiesService.listar(req.query.filtro || '');

    if (temasProperties) {
      res.json({
        success: true,
        temasProperties: temasProperties[0]
      });
    } else {
      res.json({
        success: true,
        temasProperties: []
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message
    });
  }
};


const consultarPorCodigo = async function(req, res) {
  console.log("consultar tema y propiedades");
  const id = req.params.id;
  try {
    const temasPropertiesModelResult = await ThemesPropertiesService.consultarPorCodigo(req.query.id || '');

    if (temasPropertiesModelResult) {
      res.json({
        success: true,
        temasProperties: temasPropertiesModelResult
      });
    } else {
      res.json({
        success: true,
        temasProperties: null
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message
    });
  }
};

const actualizar = async function(req, res) {
  console.log("actualizar tema y propiedades");
  let temaPropertiesRetorno = null; 
  const data = req.body; 
  const id = req.body.id;
  try {
    temaPropertiesRetorno = await ThemesPropertiesService.actualizar(
      req.body.id,
      req.body.themes_id,
      req.body.property_name,
      req.body.property_value
    );
    res.json({
      success: true,
      temasProperties: temaPropertiesRetorno
    });
  } catch (error) {
    console.log(error);
    res.json({
      success:false,
      error: error.message
    });
  }
};

const eliminar = async function(req, res) {
  console.log("eliminar tema y propiedades");
  try {
    await ThemesPropertiesService.eliminar(req.query.id || '');
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
