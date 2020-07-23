import { Empleado, EmpleadoDb } from '../empleado.interface';
import { TelefonoModel } from '../mysql/telefono.model';
import { Telefono } from '../tel.interface';
import pool from '../../database/mysql/database';

class EmpleadoModel implements EmpleadoDb {

    async getEmpleados(): Promise<Array<Empleado>> {
        return new Promise((res, rej) => {
            pool.query('select * from empleado', (err, data) => {
                if (err) {
                    rej('Se presento un error');
                } else {
                    res(this.formatoEmpleados(data));
                }
            });
        });
    }

    async getEmpleado(id: string): Promise<Array<Empleado>> {
        return new Promise((res, rej) => {
            pool.query('select * from empleado where numero_ident = ?', [id], (err, data) => {
                if (err) {
                    rej('Se presento un error');
                } else {
                    res(this.formatoEmpleados(data));
                }
            });
        });
    }

    async insertEmpleado(emp: Empleado): Promise<any> {
        return new Promise((res, rej) => {
            let query = `INSERT INTO empleado
             VALUES ('${emp.numero_id}',${emp.tipo_id},'${emp.nombres}','${emp.apellidos}','${emp.correo}','${emp.fecha_ingreso}',${emp.salario})`;
            pool.query(query, async (err, data) => {
                if (err) {
                    rej(err);
                } else {
                    res({
                        'InsertEmp': (data.affectedRows == 1) ? true : false,
                        'InsertTels': await this.insertTel(emp.telefonos)
                    });
                }
            });
        });
    }

    updateEmpleado(emp: Empleado): Promise<any> {
        return new Promise((res, rej) => {
            let query = this.setQueryUpt(emp);
            pool.query(query, async (err, data) => {
                if (err) {
                    rej(err);
                } else {
                    res({
                        'InsertEmp': (data.affectedRows == 1) ? true : false,
                        'InsertTels': await this.telsUpdate(emp.telefonos)
                    });
                }
            });
        });
    }


    async deleteEmpleado(idEmp: string): Promise<any> {
        let modeltel = new TelefonoModel();
        //borramos lo telefonos 
        let respDelTels = await modeltel.deleteTelefonos(idEmp);
        return new Promise((res, rej) => {
            let query = `DELETE FROM empleado WHERE numero_ident = ${idEmp}`;
            pool.query(query, async (err, data) => {
                if (err) {
                    rej(err);
                } else {
                    res({
                        'DeleteTels': respDelTels,
                        'DeleteEmp': (data.affectedRows == 1) ? true : false
                    });
                }
            });
        });
    }

    //funcion que nos ayuda a actualizar los telefonos
    //de un empleado
    async telsUpdate(tels: Array<Telefono>) {
        let flagInsert = true;
        if (tels.length > 0) {
            let modeltel = new TelefonoModel();
            for (let i = 0; i < tels.length; i++) {
                try {
                    let resp = await modeltel.updateTelefono(tels[i]);
                    flagInsert = flagInsert && (resp.affectedRows == 1 ? true : false);
                } catch (e) {
                    flagInsert = flagInsert && false;
                }
            }
            return flagInsert;
        }
    }

    //funcion que nos ayuda a guardar los telefonos 
    //de un empleado
    async insertTel(tels: Array<Telefono>) {
        if (tels.length > 0) {
            let modeltel = new TelefonoModel();
            let flagInsert = true;
            for (let i = 0; i < tels.length; i++) {
                try {
                    let resp = await modeltel.insertTelefono(tels[i]);
                    flagInsert = flagInsert && (resp.affectedRows == 1 ? true : false);
                } catch (e) {
                    flagInsert = flagInsert && false;
                }
            }
            return flagInsert;
        } else {
            return true;
        }
    }


    //funcion que nos ayuda a dar formato a la respuesta
    //de la base de datos 
    async formatoEmpleados(data: any) {
        let modelTel = new TelefonoModel();
        let resp: any = [];
        for (let i = 0; i < data.length; i++) {
            let item: any = data[i];
            let emp = {
                nombres: item.nombres,
                apellidos: item.apellidos,
                tipo_id: item.tipo_id,
                numero_id: item.numero_ident,
                correo: item.correo,
                fecha_ingreso: item.fecha_ing,
                salario: item.salario_mensual,
                telefonos: await modelTel.getTelefonosXEmp(item.numero_ident)
            }
            resp.push(emp);
        }
        return resp;
    }

    //funcion que nos ayuda a armar el query de 
    //update de empleado
    setQueryUpt(emp: Empleado) {
        let tipo_id = emp.tipo_id != null ? `tipo_id='${emp.tipo_id}',` : '';
        let nombres = emp.nombres != null ? `nombres='${emp.nombres}',` : '';
        let apellidos = emp.apellidos != null ? `apellidos='${emp.apellidos}',` : '';
        let correo = emp.correo != null ? `correo='${emp.correo}',` : '';
        let fecha_ing = emp.fecha_ingreso != null ? `fecha_ing='${emp.fecha_ingreso}',` : '';
        let salario = emp.salario != null ? `salario_mensual='${emp.salario}',` : '';

        let concat = `${tipo_id}${nombres}${apellidos}${correo}${fecha_ing}${salario}`;

        concat = concat.substr(0, concat.length - 1);

        return `UPDATE empleado SET ${concat}
        WHERE numero_ident = ${emp.numero_id}`
    }


}

export { EmpleadoModel };