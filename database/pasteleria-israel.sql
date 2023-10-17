/ / -----------------Hector---------------
-- Table mydb.usuario
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
);
CREATE TABLE IF NOT EXISTS proveedor (
	idprov SERIAL PRIMARY KEY,
	nombre_pr VARCHAR(45),
	telefono_pr INT,
	correo_pr VARCHAR(45),
	direccion_pr VARCHAR(45),
	NIT_pr VARCHAR(45)
);
CREATE TABLE IF NOT EXISTS producto (
	id_producto SERIAL PRIMARY KEY,
	nombre_prod varchar(45) unique,
	descripcion_prod varchar(45),
	peso_prod float,
	fechavencimiento date
);
CREATE TABLE IF NOT EXISTS modo_pago (
	id_modopago SERIAL PRIMARY KEY,
	nombre_mopago varchar(45) unique
);
CREATE TABLE IF NOT EXISTS factura (
	id_factura serial primary key,
	num_factura int unique,
	observaciones varchar(75)
);
-- Table mydb.venta
CREATE TABLE IF NOT EXISTS venta (
	id_venta SERIAL PRIMARY KEY,
	fecha DATE,
	cantidad INT,
	total FLOAT,
	nom_cliente varchar (45),
	FOREIGN KEY (nom_cliente) REFERENCES cliente (nombre_cl),
	ti_pago varchar(45),
	FOREIGN KEY (ti_pago) REFERENCES modo_pago (nombre_mopago),
	numero_fact int,
	FOREIGN KEY (numero_fact) REFERENCES factura (num_factura),
	nom_producto varchar (50),
	FOREIGN KEY (nom_producto) REFERENCES producto (nombre_prod),
	descripcion VARCHAR(45)
);
CREATE TABLE IF NOT EXISTS compras (
	idcompras serial PRIMARY KEY,
	responsable VARCHAR(45),
	nombre_producto varchar(45),
	cantidad int,
	metd_pago VARCHAR(40),
	emision date,
	entrega date
);
/ / ------------------------------Elvis------------
CREATE TABLE productos (
	id serial PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	descripcion TEXT,
	precio NUMERIC(10, 2) NOT NULL,
	stock INT NOT NULL
);
CREATE OR REPLACE FUNCTION crear_producto() RETURNS TRIGGER AS $$ BEGIN RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER crear_producto_trigger
AFTER
INSERT ON productos FOR EACH ROW EXECUTE FUNCTION crear_producto();
CREATE OR REPLACE FUNCTION actualizar_producto() RETURNS TRIGGER AS $$ BEGIN RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER actualizar_producto_trigger
AFTER
UPDATE ON productos FOR EACH ROW EXECUTE FUNCTION actualizar_producto();
CREATE OR REPLACE FUNCTION eliminar_producto() RETURNS TRIGGER AS $$ BEGIN RETURN OLD;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER eliminar_producto_trigger BEFORE DELETE ON productos FOR EACH ROW EXECUTE FUNCTION eliminar_producto();
CREATE TABLE ventas (
	id serial PRIMARY KEY,
	cliente_id INT NOT NULL,
	fecha_venta DATE NOT NULL,
	total NUMERIC(10, 2) NOT NULL
);
CREATE OR REPLACE FUNCTION crear_venta() RETURNS TRIGGER AS $$ BEGIN RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER crear_venta_trigger
AFTER
INSERT ON ventas FOR EACH ROW EXECUTE FUNCTION crear_venta();
CREATE OR REPLACE FUNCTION actualizar_venta() RETURNS TRIGGER AS $$ BEGIN RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER actualizar_venta_trigger
AFTER
UPDATE ON ventas FOR EACH ROW EXECUTE FUNCTION actualizar_venta();
CREATE OR REPLACE FUNCTION eliminar_venta() RETURNS TRIGGER AS $$ BEGIN RETURN OLD;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER eliminar_venta_trigger BEFORE DELETE ON ventas FOR EACH ROW EXECUTE FUNCTION eliminar_venta();
CREATE TABLE pedidos (
	id serial PRIMARY KEY,
	cliente_id INT NOT NULL,
	productos JSONB NOT NULL,
	total NUMERIC(10, 2) NOT NULL,
	fecha_pedido DATE NOT NULL
);
CREATE OR REPLACE FUNCTION crear_pedido() RETURNS TRIGGER AS $$ BEGIN RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER crear_pedido_trigger
AFTER
INSERT ON pedidos FOR EACH ROW EXECUTE FUNCTION crear_pedido();
CREATE OR REPLACE FUNCTION actualizar_pedido() RETURNS TRIGGER AS $$ BEGIN RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER actualizar_pedido_trigger
AFTER
UPDATE ON pedidos FOR EACH ROW EXECUTE FUNCTION actualizar_pedido();
CREATE OR REPLACE FUNCTION eliminar_pedido() RETURNS TRIGGER AS $$ BEGIN RETURN OLD;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER eliminar_pedido_trigger BEFORE DELETE ON pedidos FOR EACH ROW EXECUTE FUNCTION eliminar_pedido();