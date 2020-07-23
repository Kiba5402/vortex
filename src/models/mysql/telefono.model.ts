import { Telefono, TelefonoDb } from '../tel.interface';
import pool from '../../database/mysql/database';

class TelefonoModel implements TelefonoDb {

    getTelefonos(): Promise<Telefono[]> {
        throw new Error("Method not implemented.");
    }

    getTelefonosXEmp(idEmp: string): Promise<Telefono[]> {
        return new Promise((res, rej) => {
            pool.query('SELECT * FROM `telefono` WHERE `numero_ident` = ?', [idEmp], (err, data) => {
                if (err) {
                    rej('Se presento un error');
                } else {
                    res(data);
                }
            });
        });
    }

    async insertTelefono(tel: Telefono): Promise<any> {
        return new Promise((res, rej) => {
            let query = `INSERT INTO telefono VALUES ('${tel.id_empleado}',${tel.telefono})`;         
            pool.query(query, (err, data) => {
                if (err) {
                    rej(err);
                } else {
                    res(data);
                }
            });
        });
    }

    updateTelefono(tel: any): Promise<any> {
        return new Promise((res, rej) => {
            let query = `UPDATE telefono SET numero_tel= ${tel.telefono}
             WHERE numero_ident = ${tel.id_empleado} and numero_tel = ${tel.telefonoAnt}`;
            pool.query(query, async (err, data) => {
                if (err) {
                    rej(err);
                } else {
                    console.log(data);                    
                    res((data.affectedRows == 1) ? true : false);
                }
            });
        });
    }

    async deleteTelefonos(idEmp: string): Promise<any> {
        return new Promise((res, rej) => {
            let query = `DELETE FROM telefono WHERE numero_ident = ${idEmp}`;
            pool.query(query, async (err, data) => {
                if (err) {
                    rej(err);
                } else {
                    res((data.affectedRows >= 0) ? true : false);
                }
            });
        });
    }

    async deleteTelefono(idEmp: string, tel: number): Promise<any> {
        return new Promise((res, rej) => {
            let query = `DELETE FROM telefono WHERE numero_ident = ${idEmp} and numero_tel = ${tel}`;
            pool.query(query, async (err, data) => {
                if (err) {
                    rej(err);
                } else {
                    res((data.affectedRows == 1) ? true : false);
                }
            });
        });
    }

}

export { TelefonoModel };