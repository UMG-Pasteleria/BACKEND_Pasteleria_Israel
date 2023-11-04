const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS PAGINAS WEB --------------------------------------
const getAllweb = async (req, res, next) => {
  try {
    const allweb = await pool.query("SELECT *FROM web");
    res.json(allweb.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO DATO WEB ----------------------------------------
const getWeb = async (req, res, next) => {
  try {
    const { id_web } = req.params;
    const result = await pool.query("SELECT *FROM web WHERE id_web = $1", [
      id_web,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "web no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO DATO ------------------
const crearWeb = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { titulo, descripcion } = req.body;
    const result = await pool.query(
      "INSERT INTO web ( titulo, descripcion) VALUES ($1, $2) RETURNING *",
      //INSERT INTO usuario(iduser, nombre, apellido, telefono, email, contrasenia) VALUES (2,'juan', 'Mecanico', 3215792, 'juan@mecanico.com', 'juan123')
      [titulo, descripcion]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE USUARIO -----------------------------------------
const actualizarWeb = async (req, res, next) => {
  const { id_web } = req.params;
  try {
    const { titulo, descripcion } = req.body;

    const result = await pool.query(
      "UPDATE web SET titulo = $1, descripcion = $2 WHERE id_web = $3 RETURNING *",
      [titulo, descripcion, id_web]
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
const eliminarWeb = async (req, res, next) => {
  const { id_web } = req.params;
  try {
    const result = await pool.query("DELETE FROM web WHERE id_web = $1", [
      id_web,
    ]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Web no encontrado",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllweb,
  getWeb,
  crearWeb,
  actualizarWeb,
  eliminarWeb,
};
