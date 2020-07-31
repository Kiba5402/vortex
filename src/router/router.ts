//imports 
import path from 'path';
import express, { Router } from 'express';
import { EmpleadoController } from '../controllers/empleado.controller';
import { loginController } from '../controllers/login.controller';

//constante
const router: Router = express.Router();
const mainPath = path.resolve(process.cwd());
const control = new EmpleadoController();
const ctrLog = new loginController();

//ruta inicial que pinta el home
router.get('/', (req, res) => {
    res.sendFile(mainPath + '/src/views/home.html');
});

//ruta de prueba
router.get('/prueba', ctrLog.verifySign, (req: any, res: any) => {
    res.json(req.infoUsr);
});

/* //ruta de login
router.get('/login', ctrLog.signUp);

//ruta de logout
router.get('/logout', ctrLog.signOut); */

//ruta inicial que pinta el home
router.get('/getEmp', control.getEmpleados);

//ruta que trae un empleadosegun su id
router.get('/getEmp/:id', control.getEmpleado);

//ruta que guarda un nuevo empleado
router.post('/insert', control.insertEmpleado);

//ruta que borra un empleado
router.delete('/deleteEmp/:idEmp', control.deleteEmpleado);

//ruta que actualiza un empleado
router.put('/updateEmp/', control.updateEmpleado);

//exportamos
export = router;
