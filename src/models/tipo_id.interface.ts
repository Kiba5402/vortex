interface TipoId {
    id_ident: number,
    nombre: String
}

interface TipoIdDb {
    getTipoId(): Array<TipoId>;
    getTipoIdXId(id_ident : number): Array<TipoId>;
}

//exportamos
export { TipoId, TipoIdDb };