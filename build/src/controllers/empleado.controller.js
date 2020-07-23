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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadoController = void 0;
const empleado_model_1 = require("../models/mysql/empleado.model");
class EmpleadoController {
    getEmpleados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emplDb = new empleado_model_1.EmpleadoModel();
            try {
                let resp = yield emplDb.getEmpleados();
                res.send(resp);
            }
            catch (e) {
                res.send(e);
            }
        });
    }
    getEmpleado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            let emplDb = new empleado_model_1.EmpleadoModel();
            try {
                let resp = yield emplDb.getEmpleado(id);
                res.send(resp);
            }
            catch (e) {
                res.send(e);
            }
        });
    }
    insertEmpleado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let datos = req.body;
            let emplDb = new empleado_model_1.EmpleadoModel();
            try {
                let resp = yield emplDb.insertEmpleado(datos);
                res.send(resp);
            }
            catch (e) {
                res.send(e);
            }
        });
    }
    updateEmpleado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const emp = req.body;
            let emplDb = new empleado_model_1.EmpleadoModel();
            try {
                let resp = yield emplDb.updateEmpleado(emp);
                res.send(resp);
            }
            catch (e) {
                res.send(e);
            }
        });
    }
    deleteEmpleado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idEmp = req.params.idEmp;
            let emplDb = new empleado_model_1.EmpleadoModel();
            try {
                let resp = yield emplDb.deleteEmpleado(idEmp);
                res.send(resp);
            }
            catch (e) {
                res.send(e);
            }
        });
    }
}
exports.EmpleadoController = EmpleadoController;
