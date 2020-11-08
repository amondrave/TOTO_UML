const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const  myConnection = require('express-myConnection');

const app = express();

//importando rutas
const indexRoutes = require('./routes/index');
const diagramaRoutes = require('./routes/diagrama')
const claseRoutes = require('./routes/clase')
const atributoRoutes = require('./routes/atributo')
const relacionRoutes = require('./routes/relacion')
const estadisticaRoutes = require('./routes/estadistica');
const { urlencoded } = require('express');

//configuraciones
app.set('port',process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

//middlewars
app.use(morgan('dev'));
app.use(myConnection(mysql,{
    host:'ejemplomvdb.mysql.database.azure.com',
    user: 'azuredb@ejemplomvdb',
    password: 'toto0416.',
    port: 3306,
    database: 'diagramasclases',
    multipleStatements: true
},  'single'));

app.use(express.urlencoded({extende: false}));


//rutas
app.use('/',indexRoutes);
app.use('/',diagramaRoutes);
app.use('/',claseRoutes);
app.use('/',atributoRoutes);
app.use('/',relacionRoutes);
app.use('/',estadisticaRoutes);

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), ()=>{
    console.log('Servidor escuchando en el puerto '+app.get('port'));
});