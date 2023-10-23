CREATE TABLE IF NOT EXISTS usuario (
    idusuario SERIAL PRIMARY KEY,
    nombre_u VARCHAR(45),
    apellido_u VARCHAR(45),
    edad INT,
    telefono INT,
    correo VARCHAR(45),
    direccion VARCHAR(45),
    password VARCHAR(45) NOT NULL,
    rol_idrol INT
);
CREATE TABLE IF NOT EXISTS cliente (
    id_cliente SERIAL PRIMARY KEY,
    nombre_cl VARCHAR(45) NOT NULL unique,
    NIT_cl INT,
    telefono_cl INT NOT NULL,
    direccion_cl VARCHAR(45),
    tipo_cliente VARCHAR(45) NOT NULL
);
CREATE TABLE IF NOT EXISTS tipo_cliente (
    idtipo_cliente serial,
    nombre VARCHAR(45),
    cliente_id_cliente int,
    FOREIGN KEY (cliente_id_cliente) REFERENCES cliente (id_cliente)
) CREATE TABLE IF NOT EXISTS proveedor (
    idprov SERIAL PRIMARY KEY,
    nombre_pr VARCHAR(45),
    telefono_pr INT,
    correo_pr VARCHAR(45),
    direccion_pr VARCHAR(45),
    NIT_pr VARCHAR(45)
);
CREATE TABLE IF NOT EXISTS producto (
    id_producto SERIAL PRIMARY KEY,
    cod_prod varchar (45),
    cantidad int,
    nombre_prod varchar(45) unique not null,
    peso_prod varchar(45),
    fechavencimiento date,
    descripcion_prod varchar(45)
) CREATE TABLE IF NOT EXISTS modo_pago (
    id_modopago SERIAL PRIMARY KEY,
    nombre_mopago varchar(45) unique
) CREATE TABLE IF NOT EXISTS factura (
    id_factura serial primary key,
    num_factura int unique,
    observaciones varchar(75)
) CREATE TABLE IF NOT EXISTS venta (
    id_venta SERIAL PRIMARY KEY,
    cantidad_prod INT,
    cod_producto varchar (50) not null,
    FOREIGN KEY (cod_producto) REFERENCES producto (cod_prod),
    nom_cliente varchar (45),
    ti_pago varchar(45),
    FOREIGN KEY (ti_pago) REFERENCES modo_pago (nombre_mopago),
    numero_fact int,
    FOREIGN KEY (numero_fact) REFERENCES factura (num_factura),
    fecha DATE,
    descripcion VARCHAR(45),
    total FLOAT
) create trigger TR_VENTAS on ventas for
insert AS
set nocount on 
update producto
set productos.existencia = productos.existencia - inserted.cantidad
from inserted
    inner join producto on productos.cod_prod = inserted.cod_prod
go CREATE TABLE IF NOT EXISTS compras (
        idcompras serial PRIMARY KEY,
        responsable VARCHAR(45),
        nombre_producto varchar(45),
        cantidad int,
        metd_pago VARCHAR(40),
        emision date,
        entrega date
    ) CREATE TABLE IF NOT EXISTS pastel (
        id_pastel SERIAL PRIMARY KEY,
        cod_past varchar (45) unique,
        nombre_past varchar (45) unique,
        tamanio varchar (45)
    ) CREATE TABLE IF NOT EXISTS categoria (
        id_categoria SERIAL PRIMARY KEY,
        nom_categoria varchar (45),
        nom_pastel varchar (45),
        FOREIGN KEY (nom_pastel) REFERENCES pastel (nombre_past)
    ) CREATE TABLE IF NOT EXISTS mate_prima (
        id_mateprima serial PRIMARY KEY,
        producto VARCHAR(45),
        cantidad int,
        marca varchar(45),
        precio float,
        fechavencimiento date,
        observacion varchar(45),
        categoria varchar(65)