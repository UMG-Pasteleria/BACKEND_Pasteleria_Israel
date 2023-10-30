const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS USUARIOS --------------------------------------
const getAllusuarios = async (req, res, next) => {
  try {
    const allusuarios = await pool.query("SELECT *FROM usuario");
    res.json(allusuarios.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO USUARIO ----------------------------------------
const getUsuarios = async (req, res, next) => {
  try {
    const { idusuario } = req.params;
    const result = await pool.query(
      "SELECT *FROM usuario WHERE idusuario = $1",
      [idusuario]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//---------------CREAR UN NUEVO USUARIO ------------------

const crearUsuarios = async (req, res, next) => {
  try {
    //console.log(req.body);
    const {
      nombre_u,
      apellido_u,
      edad,
      telefono,
      correo,
      direccion,
      password,
      rol_idrol,
    } = req.body;
    const result = await pool.query(
      "INSERT INTO usuario ( nombre_u, apellido_u, edad, telefono,  correo, direccion, password, rol_idrol) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      //INSERT INTO usuario(iduser, nombre, apellido, telefono, email, contrasenia) VALUES (2,'juan', 'Mecanico', 3215792, 'juan@mecanico.com', 'juan123')
      [
        nombre_u,
        apellido_u,
        edad,
        telefono,
        correo,
        direccion,
        password,
        rol_idrol,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE USUARIO -----------------------------------------
const actualizarUsuarios = async (req, res, next) => {
  const { idusuario } = req.params;
  try {
    const {
      nombre_u,
      apellido_u,
      edad,
      telefono,
      correo,
      direccion,
      password,
      rol_idrol,
    } = req.body;

    const result = await pool.query(
      "UPDATE usuario SET nombre_u = $1, apellido_u = $2, edad = $3, telefono = $4, correo = $5, direccion = $6, password = $7, rol_idrol = $8 WHERE idusuario = $9 RETURNING *",
      [
        nombre_u,
        apellido_u,
        edad,
        telefono,
        correo,
        direccion,
        password,
        rol_idrol,
        idusuario,
      ]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//---------------------- ELIMINAR USUARIO --------------------------
const eliminarUsuarios = async (req, res) => {
  const { idusuario } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM usuario WHERE idusuario = $1",
      [idusuario]
    );

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Usuario no encontrado",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllusuarios,
  getUsuarios,
  crearUsuarios,
  actualizarUsuarios,
  eliminarUsuarios,
};
