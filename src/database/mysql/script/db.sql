CREATE DATABASE empleados;

USE empleados;

CREATE TABLE tipo_id
(
    id_ident INT(10) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY(id_ident)
);


CREATE TABLE empleado
(
    numero_ident VARCHAR(50) NOT NULL,
    tipo_id INT(10) NOT NULL,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    correo VARCHAR(50),
    fecha_ing DATE,
    salario_mensual DECIMAL(20) NOT NULL,
    PRIMARY KEY(numero_ident),
    FOREIGN KEY(tipo_id) 
       REFERENCES tipo_id(id_ident)
);

CREATE TABLE telefono
(
    numero_ident VARCHAR(50) NOT NULL,
    numero_tel INT(15) NOT NULL,
    PRIMARY KEY(numero_ident, numero_tel),
    FOREIGN KEY(numero_ident) 
       REFERENCES empleado(numero_ident)
);

/*Insert*/
INSERT INTO `tipo_id`(`id_ident`, `nombre`) 
    VALUES (1, "nit"), (2, "cc"); 

INSERT INTO `empleado`(`numero_ident`, `tipo_id`, `nombres`, `apellidos`, `correo`, `fecha_ing`, `salario_mensual`) 
    VALUES ('1016042511', 2, "Cristhian", "Reyes", "cristian5402@gmail.com", "2018-05-05", 2500000.0),
         ('1016042512', 2, "Camilo", "Pardo", "pardo5402@gmail.com", "2018-12-05", 2600000.0);

INSERT INTO `telefono`(`numero_ident`, `numero_tel`)
    VALUES ('1016042511', 31564981),
        ('1016042511', 8042225),
        ('1016042512', 311254778);