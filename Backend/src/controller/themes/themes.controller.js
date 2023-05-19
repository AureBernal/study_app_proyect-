const {sequelize} = require ("../../connection");
const ThemesService = require ("../../service/themes.service");

const listar = async function(req, res) {
console.log("listar temas");
try{
const temas = await ThemesService.listar(req.query.filtro || '');

    if(temas){
        res.json({
            success: true,
            temas: temas[0]
        })
    }else{
        res.json({
            success: true,
            temas: []
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
console.log("consultar tema");
const id = req.params.id;
try{
    const temaModelResult = await ThemesService.consultarPorCodigo(req.query.id || '');
    
    if(temaModelResult){
        res.json({
            success: true,
            tema: temaModelResult
        })
    }else{
        res.json({
            success: true,
            tema: null
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
     console.log("actualizar tema");
     let temaRetorno = null; //GUARDARA EL TEMA QUE SE VA A INCLUIR O EDITAR
     const data = req.body; // SE OBTIENEN LOS DATOS DEL CUERPO DE LA PETICIÓN
     const id = req.body.id; // ID PASADO
     try {
     temaRetorno = await ThemesService.actualizar(
     req.body.id,
     req.body.create_date,
     req.body.name,
     req.body.descripcion,
     req.body.keywords,
     req.body.owner_user_id
);
  res.json({
    success: true,
    tema: temaRetorno
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
    console.log("eliminar tema");
   try {
        await ThemesService.eliminar(req.query.id || '');
        res.json({
          success: true,
      });
   } catch(error) {
      res.json({
          success: false,
          error: error.message
      })
   };
}
module.exports = {
    listar,     
    consultarPorCodigo,
    actualizar,
    eliminar
};