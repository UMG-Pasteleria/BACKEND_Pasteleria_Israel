const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS USUARIOS --------------------------------------
const getAllpaweb = async (req, res, next) => {
  try {
    const allpaginaweb = await pool.query("SELECT *FROM estado_pedido");
    res.json(allpaginaweb.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO USUARIO ----------------------------------------
const getpaweb = async (req, res, next) => {
  try {
    const { idestadop } = req.params;
    const result = await pool.query(
      "SELECT *FROM estado_pedido WHERE idestadop = $1",
      [idestadop]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: " web no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO USUARIO ------------------
const crearpaweb = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { estado } = req.body;
    const result = await pool.query(
      "INSERT INTO estado_pedido (estado) VALUES ($1) RETURNING *",
      //INSERT INTO usuario(iduser, nombre, apellido, telefono, email, contrasenia) VALUES (2,'juan', 'Mecanico', 3215792, 'juan@mecanico.com', 'juan123')
      [estado]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE USUARIO -----------------------------------------
const actualizarpaweb = async (req, res, next) => {
  const { idestadop } = req.params;
  try {
    const { estado } = req.body;

    const result = await pool.query(
      "UPDATE estado_pedido SET estado = $1 WHERE idestadop = $4 RETURNING *",
      [estado, idestadop]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "web no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//---------------------- ELIMINAR USUARIO --------------------------
const eliminarpaweb = async (req, res, next) => {
  const { idestadop } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM estado_pedido WHERE idestadop = $1",
      [idestadop]
    );

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "web no encontrado",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllpaweb,
  getpaweb,
  crearpaweb,
  actualizarpaweb,
  eliminarpaweb,
};
