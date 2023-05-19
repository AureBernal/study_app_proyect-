const usercontroller = require("../../controller/users/users.controller")

module.exports = function(app){

    app.get("/users/list", usercontroller.listar);
    app.get("/user", usercontroller.consultarPorCodigo);
    app.post("/users/update", usercontroller.actualizar);
    app.delete("/users/delete", usercontroller.eliminar);
    app.post("/user/login", usercontroller.login);

}