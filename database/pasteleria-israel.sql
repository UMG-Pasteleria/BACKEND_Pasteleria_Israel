CREATE DATABASE pasteleria_israel

create table usuario(
	iduser int not null primary key,
	nombre varchar(30) not null,
	apellido varchar(40) not null,
	telefono int not null,
	email varchar(70) not null,
	contrasenia varchar(200) not null)