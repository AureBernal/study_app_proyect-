const topicscontroller = require("../../controller/topics/topics.controller")

module.exports = function(app){

    app.get("/topics/list", topicscontroller.listar);
    app.get("/topic", topicscontroller.consultarPorCodigo);
    app.post("/topics/update", topicscontroller.actualizar);
    app.delete("/topics/delete", topicscontroller.eliminar);

}