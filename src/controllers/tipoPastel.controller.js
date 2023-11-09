const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS CATEGORIAS --------------------------------------
const getAlltipo = async (req, res, next) => {
  try {
    const alltipo = await pool.query("SELECT *FROM tipo_pastel");
    res.json(alltipo.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO CATEGORAI ----------------------------------------
const getTipo = async (req, res, next) => {
  try {
    const { idtpastel } = req.params;
    const result = await pool.query(
      "SELECT * FROM tipo_pastel WHERE idtpastel = $1",
      [idtpastel]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "tipo de pastel no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO CATEGORIA ------------------
const crearTipo = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { tipo_pastel } = req.body;
    const result = await pool.query(
      "INSERT INTO tipo_pastel ( tipo_pastel) VALUES ($1 ) RETURNING *",
      //INSERT INTO usuario(iduser, nombre, apellido, telefono, email, contrasenia) VALUES (2,'juan', 'Mecanico', 3215792, 'juan@mecanico.com', 'juan123')
      [tipo_pastel]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE CATEGORIA -----------------------------------------
const actualizarTipo = async (req, res, next) => {
  const { idtpastel } = req.params;
  try {
    const { tipo_pastel } = req.body;

    const result = await pool.query(
      "UPDATE tipo_pastel SET tipo_pastel = $1 WHERE idtpastel = $2 RETURNING *",
      [tipo_pastel, idtpastel]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Tipo de pastel no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//---------------------- ELIMINAR CATEGORIA --------------------------
const eliminarTipo = async (req, res, next) => {
  const { idtpastel } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM tipo_pastel WHERE idtpastel = $1",
      [idtpastel]
    );

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Tipo de pastel no encontrado",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAlltipo,
  getTipo,
  crearTipo,
  actualizarTipo,
  eliminarTipo,
};
