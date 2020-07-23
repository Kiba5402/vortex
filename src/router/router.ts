//imports 
import path from 'path';
import express, { Router } from 'express';
import { EmpleadoController } from '../controllers/empleado.controller';

//constante
const router: Router = express.Router();
const mainPath = path.resolve(process.cwd());
const control = new EmpleadoController();

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

//exportamos
export = router;
