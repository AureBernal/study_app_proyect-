const {sequelize} = require ("../../connection");
const {UserModel} = require ("../../model/user.model");
const Topicsservice = require ("../../service/topics.service")

const listar = async function(req, res) {
    console.log("listar topico");
    try{
        const topics = await Topicsservice.listar(req.query.filtro || '');
        
        if(topics){
            res.json({
                success: true,
                usuarios:topics[0]
        })
        }else{
            res.json({
                success: true,
                usuarios:[]
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
    console.log("consultar topico");
    const id = req.params.id;

    try{
        const topicModelResult = await Topicsservice.consultarPorCodigo(req.query.id || '');
        
        if(topicModelResult){
            res.json({
                success: true,
                topics:topicModelResult
        })
        }else{
            res.json({
                success: true,
                topics:null
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
    console.log("actualizar topico");
    let topicoRetorno=null; //GUARDARA EL USARIO QUE SE VA A INCLUIR O EDITAR
    const data =req.body; // SE OBTIENE LOS DATOS DEL CUERPO DE LA PETICION
    const id=req.body.id; // ID PASADO
   try {
      topicoRetorno = await Topicsservice.actualizar(req.body.id , 
                                                     req.body.create_date , 
                                                     req.body.name , 
                                                     req.body.topics_id , 
                                                     req.body.order , 
                                                     req.body.priority , 
                                                     req.body.color , 
                                                     req.body.owner_user_id )
        res.json({
            success: true,
            user: topicoRetorno
        });
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            usuarios: error.message
        });
    }    
};

const eliminar = async function(req, res) {
    console.log("eliminar topico");
    try {
        await Topicsservice.eliminar(req.query.id || '');
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