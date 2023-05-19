const {sequelize} = require("../connection")
const jwt = require('jsonwebtoken')

const auth = async function(req, res, next){
    if (!req.headers.authorization){
        //verificar si se proporciona el encabezado de autorizacion 
        res.json({success: false, error:'No authorization header'});
        return;
    }else{
        let token = req.headers.authorization;

        const usersDB=await sequelize.query("SELECT * FROM users  WHERE token = '"+ token +"'")
        let user= null;

        if (usersDB.length > 0 && usersDB[0].length > 0){
            user = usersDB [0][0];

            console.log("token del usuario", user);

            res.locals.user=user.id

            next()
        }else{
            res.json({success: false, error: 'token invalido'})
        }
    }   
}