"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const keys_1 = require("./keys");
const mysql_1 = __importDefault(require("mysql"));
const pool = mysql_1.default.createPool(keys_1.baseDatos);
pool.getConnection((err, conn) => {
    if (err) {
        console.log('Erro bd ->', err);
    }
    else if (conn) {
        conn.release();
        console.log('Bases de datos conectada');
        return;
    }
    else {
        console.log('Error no controlado');
    }
});
module.exports = pool;
