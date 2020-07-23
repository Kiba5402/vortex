"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
//imports 
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const empleado_controller_1 = require("../controllers/empleado.controller");
//constante
const router = express_1.default.Router();
const mainPath = path_1.default.resolve(process.cwd());
const control = new empleado_controller_1.EmpleadoController();
//ruta inicial que pinta el home
router.get('/', (req, res) => {
    res.sendFile(mainPath + '/src/views/home.html');
});
//ruta inicial que pinta el home
router.get('/getEmp', control.getEmpleados);
router.get('/getEmp/:id', control.getEmpleado);
router.post('/insert', control.insertEmpleado);
router.delete('/deleteEmp/:idEmp', control.deleteEmpleado);
router.put('/updateEmp/', control.updateEmpleado);
module.exports = router;
