const themescontroller = require("../../controller/themes/themes.controller")

module.exports = function(app){

    app.get("/themes/list", themescontroller.listar);
    app.get("/theme/:id", themescontroller.consultarPorCodigo);
    app.post("/themes/update", themescontroller.actualizar); 
    app.delete("/themes/delete/:id", themescontroller.eliminar);

}