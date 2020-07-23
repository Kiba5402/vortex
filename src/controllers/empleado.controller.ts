import { EmpleadoModel } from '../models/mysql/empleado.model';
import { EmpleadoDb } from '../models/empleado.interface';

class EmpleadoController {

    async getEmpleados(req: any, res: any) {
        let emplDb = new EmpleadoModel();
        try {
            let resp = await emplDb.getEmpleados();
            res.send(resp);
        } catch (e) {
            res.send(e);
        }
    }

    async getEmpleado(req: any, res: any) {
        const id: string = req.params.id;
        let emplDb = new EmpleadoModel();
        try {
            let resp = await emplDb.getEmpleado(id);
            res.send(resp);
        } catch (e) {
            res.send(e);
        }
    }

    async insertEmpleado(req: any, res: any) {
        let datos = req.body;
        let emplDb = new EmpleadoModel();
        try {
            let resp = await emplDb.insertEmpleado(datos);
            res.send(resp);
        } catch (e) {
            res.send(e);
        }
    }

    async updateEmpleado(req: any, res: any) {
        const emp = req.body;
        let emplDb = new EmpleadoModel();
        try {
            let resp = await emplDb.updateEmpleado(emp);
            res.send(resp);
        } catch (e) {
            res.send(e);
        }
    }

    async deleteEmpleado(req: any, res: any) {
        const idEmp: string = req.params.idEmp;
        let emplDb = new EmpleadoModel();
        try {
            let resp = await emplDb.deleteEmpleado(idEmp);
            res.send(resp);
        } catch (e) {
            res.send(e);
        }
    }
}

export { EmpleadoController };