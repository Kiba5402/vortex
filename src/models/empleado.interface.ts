import { Telefono } from './tel.interface'

interface Empleado {
    nombres: String,
    apellidos: String,
    tipo_id: number,
    numero_id: String,
    correo: String,
    fecha_ingreso: String,
    salario: String,
    telefonos: Array<Telefono>,
}

interface EmpleadoDb {
    getEmpleados(): Promise<Array<Empleado>>;
    getEmpleado(id: string): Promise<Array<Empleado>>
    insertEmpleado(emp: Empleado): Promise<any>;
    updateEmpleado(emp: Empleado): Promise<any>;
    deleteEmpleado(idEmp: string): Promise<any>;
}

//exportamos
export { Empleado, EmpleadoDb };

