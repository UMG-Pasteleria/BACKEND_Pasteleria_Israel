const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS USUARIOS --------------------------------------
const getAlltamanio = async (req, res, next) => {
  try {
    const alltamanio = await pool.query(`SELECT * FROM tamanio_pastel
ORDER BY idtampast DESC 
`);
    res.json(alltamanio.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO PASTEL ----------------------------------------
const getTamanio = async (req, res, next) => {
  try {
    const { idtampast } = req.params;
    const result = await pool.query(
      "SELECT * FROM tamanio_pastel WHERE idtampast = $1",
      [idtampast]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "No exisate el tamaño de pastel",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO PASTEL ------------------
const crearTamanio = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { tamanio } = req.body;
    const result = await pool.query(
      "INSERT INTO tamanio_pastel (tamanio) VALUES ($1) RETURNING *",
      [tamanio]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE USUARIO -----------------------------------------
const actualizarTamanio = async (req, res, next) => {
  const { idtampast } = req.params;
  try {
    const { tamanio } = req.body;

    const result = await pool.query(
      "UPDATE tamanio_pastel SET tamanio = $1 WHERE idtampast = $2 RETURNING *",
      [tamanio, idtampast]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "No existe el tamaño de pastel",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//---------------------- ELIMINAR USUARIO --------------------------
const eliminarTamanio = async (req, res, next) => {
  const { idtampast } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM tamanio_pastel WHERE idtampast = $1",
      [idtampast]
    );

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Tamaño de pastel no encontrado",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAlltamanio,
  getTamanio,
  crearTamanio,
  actualizarTamanio,
  eliminarTamanio,
};
