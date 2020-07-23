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
exports.EmpleadoModel = void 0;
const telefono_model_1 = require("../mysql/telefono.model");
const database_1 = __importDefault(require("../../database/mysql/database"));
class EmpleadoModel {
    getEmpleados() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                database_1.default.query('select * from empleado', (err, data) => {
                    if (err) {
                        rej('Se presento un error');
                    }
                    else {
                        res(this.formatoEmpleados(data));
                    }
                });
            });
        });
    }
    getEmpleado(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                database_1.default.query('select * from empleado where numero_ident = ?', [id], (err, data) => {
                    if (err) {
                        rej('Se presento un error');
                    }
                    else {
                        res(this.formatoEmpleados(data));
                    }
                });
            });
        });
    }
    insertEmpleado(emp) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                let query = `INSERT INTO empleado
             VALUES ('${emp.numero_id}',${emp.tipo_id},'${emp.nombres}','${emp.apellidos}','${emp.correo}','${emp.fecha_ingreso}',${emp.salario})`;
                database_1.default.query(query, (err, data) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        rej(err);
                    }
                    else {
                        res({
                            'InsertEmp': (data.affectedRows == 1) ? true : false,
                            'InsertTels': yield this.insertTel(emp.telefonos)
                        });
                    }
                }));
            });
        });
    }
    updateEmpleado(emp) {
        return new Promise((res, rej) => {
            let query = this.setQueryUpt(emp);
            database_1.default.query(query, (err, data) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    rej(err);
                }
                else {
                    res({
                        'InsertEmp': (data.affectedRows == 1) ? true : false,
                        'InsertTels': yield this.telsUpdate(emp.telefonos)
                    });
                }
            }));
        });
    }
    deleteEmpleado(idEmp) {
        return __awaiter(this, void 0, void 0, function* () {
            let modeltel = new telefono_model_1.TelefonoModel();
            //borramos lo telefonos 
            let respDelTels = yield modeltel.deleteTelefonos(idEmp);
            return new Promise((res, rej) => {
                let query = `DELETE FROM empleado WHERE numero_ident = ${idEmp}`;
                database_1.default.query(query, (err, data) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        rej(err);
                    }
                    else {
                        res({
                            'DeleteTels': respDelTels,
                            'DeleteEmp': (data.affectedRows == 1) ? true : false
                        });
                    }
                }));
            });
        });
    }
    //funcion que nos ayuda a actualizar los telefonos
    //de un empleado
    telsUpdate(tels) {
        return __awaiter(this, void 0, void 0, function* () {
            let flagInsert = true;
            if (tels.length > 0) {
                let modeltel = new telefono_model_1.TelefonoModel();
                for (let i = 0; i < tels.length; i++) {
                    try {
                        let resp = yield modeltel.updateTelefono(tels[i]);
                        flagInsert = flagInsert && (resp.affectedRows == 1 ? true : false);
                    }
                    catch (e) {
                        flagInsert = flagInsert && false;
                    }
                }
                return flagInsert;
            }
        });
    }
    //funcion que nos ayuda a guardar los telefonos 
    //de un empleado
    insertTel(tels) {
        return __awaiter(this, void 0, void 0, function* () {
            if (tels.length > 0) {
                let modeltel = new telefono_model_1.TelefonoModel();
                let flagInsert = true;
                for (let i = 0; i < tels.length; i++) {
                    try {
                        let resp = yield modeltel.insertTelefono(tels[i]);
                        flagInsert = flagInsert && (resp.affectedRows == 1 ? true : false);
                    }
                    catch (e) {
                        flagInsert = flagInsert && false;
                    }
                }
                return flagInsert;
            }
            else {
                return true;
            }
        });
    }
    //funcion que nos ayuda a dar formato a la respuesta
    //de la base de datos 
    formatoEmpleados(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let modelTel = new telefono_model_1.TelefonoModel();
            let resp = [];
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                let emp = {
                    nombres: item.nombres,
                    apellidos: item.apellidos,
                    tipo_id: item.tipo_id,
                    numero_id: item.numero_ident,
                    correo: item.correo,
                    fecha_ingreso: item.fecha_ing,
                    salario: item.salario_mensual,
                    telefonos: yield modelTel.getTelefonosXEmp(item.numero_ident)
                };
                resp.push(emp);
            }
            return resp;
        });
    }
    //funcion que nos ayuda a armar el query de 
    //update de empleado
    setQueryUpt(emp) {
        let tipo_id = emp.tipo_id != null ? `tipo_id='${emp.tipo_id}',` : '';
        let nombres = emp.nombres != null ? `nombres='${emp.nombres}',` : '';
        let apellidos = emp.apellidos != null ? `apellidos='${emp.apellidos}',` : '';
        let correo = emp.correo != null ? `correo='${emp.correo}',` : '';
        let fecha_ing = emp.fecha_ingreso != null ? `fecha_ing='${emp.fecha_ingreso}',` : '';
        let salario = emp.salario != null ? `salario_mensual='${emp.salario}',` : '';
        let concat = `${tipo_id}${nombres}${apellidos}${correo}${fecha_ing}${salario}`;
        concat = concat.substr(0, concat.length - 1);
        return `UPDATE empleado SET ${concat}
        WHERE numero_ident = ${emp.numero_id}`;
    }
}
exports.EmpleadoModel = EmpleadoModel;
