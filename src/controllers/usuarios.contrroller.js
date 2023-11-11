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
    const { iduser } = req.params;
    const result = await pool.query("SELECT *FROM usuario WHERE iduser = $1", [
      iduser,
    ]);
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
    const { nombre_u, telefono_u, email, usuario_password } = req.body;
    const result = await pool.query(
      "INSERT INTO usuario (nombre_u, telefono_u, email, usuario_password) VALUES ($1, $2, $3, $4) RETURNING *",
      //INSERT INTO usuario(iduser, nombre, apellido, telefono, email, contrasenia) VALUES (2,'juan', 'Mecanico', 3215792, 'juan@mecanico.com', 'juan123')
      [nombre_u, telefono_u, email, usuario_password]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE USUARIO -----------------------------------------
const actualizarUsuarios = async (req, res, next) => {
  const { iduser } = req.params;
  try {
    const { nombre_u, telefono_u, email, usuario_password } = req.body;

    const result = await pool.query(
      "UPDATE usuario SET nombre_u = $1, telefono_u = $2, email= $3,usuario_password = $4 WHERE iduser = $5 RETURNING *",
      [nombre_u, telefono_u, email, usuario_password, iduser]
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
const eliminarUsuarios = async (req, res, next) => {
  const { iduser } = req.params;
  try {
    const result = await pool.query("DELETE FROM usuario WHERE iduser = $1", [
      iduser,
    ]);

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
