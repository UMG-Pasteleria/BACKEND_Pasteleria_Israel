-- ---------MOSTRAR INFORMACION RELEVANTE SOBRE LAS COMPRAS --------------------
SELECT compra.idcompra,
    compra.fecha_compra,
    detalle_compra.cantidad,
    detalle_compra.costo_unitario,
    proveedor.nombre_proveedor,
    proveedor.nit,
    producto.producto,
    producto.stock,
    producto.descripcion,
    producto.fecha_vencimiento
FROM compra
    JOIN detalle_compra ON compra.idcompra = detalle_compra.idetallec
    JOIN proveedor ON detalle_compra.idetallec = proveedor.idprov
    JOIN producto ON proveedor.idprov = producto.idprod -- ---------MOSTRAR DATOS NECESARIOS DE PEDIDO	--------------------------------
select pedido.idpedido,
    pedido.fecha_pedido,
    cliente.nombre_cl,
    pastel.pastel,
    tamanio_pastel.tamanio,
    decoracion_pastel.decoracion,
    pedido.cantidad,
    pedido.total,
    cliente.direccion_cl,
    cliente.telefono_cl,
    estado_pedido.estado
from pedido
    join cliente on pedido.cliente_idped = cliente.idcliente
    join pastel on pedido.pastel_idped = pastel.idpastel
    join tamanio_pastel on pastel.tamanio_idpast = tamanio_pastel.idtampast
    join decoracion_pastel on pastel.dec_idpast = decoracion_pastel.idecpast
    join estado_pedido on pedido.estado_idped = estado_pedido.idestadop -- ---------------------------- INSERTAR VARIOS REGISTROS EN VARIAS TABLAS------
INSERT INTO pedido(
        fecha_pedido,
        cantidad,
        total,
        cliente_idped,
        pastel_idped,
        estado_idped,
        modopago_idped
    )
values (12 -10 -2023, 2, 150, 5, 2, 1) -- ----------------------------TABLAS CREADAS ANTERIORMENTE----------------------------------------
    create table tipo_producto (
        idtprod serial primary key not null,
        tipo varchar(200)
    );
create table proveedor (
    idprov serial primary key not null,
    nombre_proveedor varchar(300),
    nit int,
    telefono_prov int,
    email varchar(200),
    direccion_prov varchar(300)
);
create table modo_pago(
    idmodp serial primary key not null,
    modo varchar(200)
);
create table usuario (
    iduser serial primary key not null,
    nombre_u varchar(300),
    telefono_u int,
    email_u varchar(300),
    contrasenia varchar(500)
);
create table producto (
    idprod serial primary key not null,
    producto varchar(200),
    descripcion text,
    stock int,
    fecha_vencimiento date,
    id_tipoprod int references tipo_producto(idtprod),
    id_prov int references proveedor(idprov)
);
create table inventario (
    idinvent serial primary key not null,
    prod_idinv int references producto(idprod),
    stock int,
    precio float,
    fecha_now timestamp DEFAULT current_timestamp
);
create table compra (
    idcompra serial primary key not null,
    prov_idcomp int references proveedor(idprov),
    user_idcomp int references usuario(iduser),
    fecha_compra timestamp default current_timestamp
);
create table detalle_compra(
    idetallec serial primary key not null,
    prov_idetcomp int references proveedor(idprov),
    comp_idetcomp int references compra(idcompra),
    prod_idetcomp int references producto(idprod),
    cantidad int,
    costo_unitario float
);
-- -----------------------------------------------nuevas tablas para la base de datos---------------------
create table tipo_cliente(
    idtcl serial primary key not null,
    tipo_cl varchar(150)
);
create table tipo_pastel(
    idtpastel serial primary key not null,
    tipo_pastel varchar(120)
);
create table tamanio_pastel(
    idtampast serial primary key not null,
    tamanio varchar(80)
);
create table decoracion_pastel(
    idecpast serial primary key not null,
    decoracion varchar(300)
);
create table categoria_pastel(
    idcatp serial primary key not null,
    categoria varchar(120)
);
create table estado_pedido(
    idestadop serial primary key not null,
    estado varchar(50)
);
CREATE TABLE cliente(
    idcliente serial primary key not null,
    nombre_cl varchar(250),
    nit_cl int,
    telefono_cl int,
    direccion_cl varchar(300),
    tipo_idtclient int references tipo_cliente(idtcl)
);
CREATE TABLE pastel (
    idpastel serial primary key not null,
    pastel varchar(200),
    precio float,
    tamanio_idpast int references tamanio_pastel(idtampast),
    dec_idpast int references decoracion_pastel(idecpast),
    cat_idpast int references categoria_pastel(idcatp)
);
CREATE TABLE pedido(
    idpedido serial primary key not null,
    fecha_pedido timestamp,
    cantidad float,
    total float,
    cliente_idped int references cliente(idcliente),
    pastel_idped int references pastel (idpastel),
    estado_idped int references estado_pedido(idestadop),
    modopago_idped int references modo_pago(idmodp)
);
CREATE TABLE venta (
    idventa serial primary key not null,
    pedido_idvent int references pedido(idpedido)
)