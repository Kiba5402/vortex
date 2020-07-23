"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router/router"));
//inicializaciones
const app = express_1.default();
//configuraciones 
app.set('port', process.env.PORT || 3000);
//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//Rutas
app.use(router_1.default);
//Archivos estaticos
app.use(express_1.default.static("src/public"));
//iniciar servidor
app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en el puerto', app.get('port'));
});
