CREATE DATABASE pasteleria_israel

create table usuario(
	iduser int primary key,
	nombre varchar(30),
	apellido varchar(40),
	telefono int,
	email varchar(70),
	contrasenia varchar(200))