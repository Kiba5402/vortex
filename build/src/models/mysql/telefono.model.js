"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelefonoModel = void 0;
const database_1 = __importDefault(require("../../database/mysql/database"));
class TelefonoModel {
    getTelefonos() {
        throw new Error("Method not implemented.");
    }
    getTelefonosXEmp(idEmp) {
        return new Promise((res, rej) => {
            database_1.default.query('SELECT * FROM `telefono` WHERE `numero_ident` = ?', [idEmp], (err, data) => {
                if (err) {
                    rej('Se presento un error');
                }
                else {
                    res(data);
                }
            });
        });
    }
    insertTelefono(tel) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                let query = `INSERT INTO telefono VALUES ('${tel.id_empleado}',${tel.telefono})`;
                database_1.default.query(query, (err, data) => {
                    if (err) {
                        rej(err);
                    }
                    else {
                        res(data);
                    }
                });
            });
        });
    }
    updateTelefono(tel) {
        return new Promise((res, rej) => {
            let query = `UPDATE telefono SET numero_tel= ${tel.telefono}
             WHERE numero_ident = ${tel.id_empleado} and numero_tel = ${tel.telefonoAnt}`;
            database_1.default.query(query, (err, data) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    rej(err);
                }
                else {
                    console.log(data);
                    res((data.affectedRows == 1) ? true : false);
                }
            }));
        });
    }
    deleteTelefonos(idEmp) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                let query = `DELETE FROM telefono WHERE numero_ident = ${idEmp}`;
                database_1.default.query(query, (err, data) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        rej(err);
                    }
                    else {
                        res((data.affectedRows >= 0) ? true : false);
                    }
                }));
            });
        });
    }
    deleteTelefono(idEmp, tel) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                let query = `DELETE FROM telefono WHERE numero_ident = ${idEmp} and numero_tel = ${tel}`;
                database_1.default.query(query, (err, data) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        rej(err);
                    }
                    else {
                        res((data.affectedRows == 1) ? true : false);
                    }
                }));
            });
        });
    }
}
exports.TelefonoModel = TelefonoModel;
