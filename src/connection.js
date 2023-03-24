const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("postgres", 'postgres','admin',{
    host : 'localhost',
    port : 5432,
    dialect : 'postgres'
})

const testConnection = function(){
    try{
        sequelize.authenticate();
        console.log("conectado con exito!");
    }catch(error){
        console.log("error de conexion");
    }

    
}
testConnection();

module.exports={
    Sequelize,
    sequelize
}
