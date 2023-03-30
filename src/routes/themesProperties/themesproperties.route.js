const themesPropertiescontroller = require("../../controller/Themes_properties/themesproperties.controller")

module.exports = function(app){

    app.get("/themesproperties/list", themesPropertiescontroller.listar);
    app.get("/themesproperties", themesPropertiescontroller.consultarPorCodigo);
    app.post("/themesproperties/update", themesPropertiescontroller.actualizar); 
    app.delete("/themesproperties/delete", themesPropertiescontroller.eliminar);

}