import express from 'express';
import path from 'path';
import router from './router/router'

//inicializaciones
const app = express();

//configuraciones 
app.set('port', 4000);

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rutas
app.use(router);

//Archivos estaticos
app.use(express.static("src/public"));

//iniciar servidor
app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en el puerto', app.get('port'));
});