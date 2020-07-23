import { baseDatos } from './keys';
import mysql from 'mysql';
import { promisify } from 'util';

const pool = mysql.createPool(baseDatos);

pool.getConnection((err, conn) => {
    if (err) {
        console.log('Erro bd ->', err);
    } else if (conn) {
        conn.release();
        console.log('Bases de datos conectada');
        return;
    } else {
        console.log('Error no controlado');
    }
});

//exportamos
export = pool;