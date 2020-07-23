interface Telefono {
    id_empleado: String,
    telefono: Number,
}

interface TelefonoDb {
    getTelefonos(): Promise<Telefono[]>;
    getTelefonosXEmp(idEmp: string): Promise<Telefono[]>;
    insertTelefono(tel: Telefono): Promise<any>;
    updateTelefono(tel: Telefono): Promise<any>;
    deleteTelefonos(idEmp: string): Promise<any>;
    deleteTelefono(idEmp: string, tel: number): Promise<any>;
}

//exportamos
export { Telefono, TelefonoDb };