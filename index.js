const express = require('express');
const bodyparser = require('body-parser')
const app = express();
app.use(bodyparser());
const userRoute = require("./src/routes/users/users.route");
const themesRoute = require("./src/routes/themes/themes.route");
const topicsRoute = require("./src/routes/topics/topics.route");
//ruta raiz
app.get('/', function (req, res) {
    //logica 
  res.send('Hello World')
});

app.get('/pagina2', function (req, res) {
    //logica de negocios
    //esta aqui -controller
  res.json({application: 'study app', version:'1.0.0'});
  
});
//llamadas a los routes de los casos de UCs
userRoute(app);
themesRoute(app);
topicsRoute(app);

app.listen(3000);
