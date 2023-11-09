const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS USUARIOS --------------------------------------
const getAlldecoracion = async (req, res, next) => {
  try {
    const alldecoracion = await pool.query(`SELECT * FROM decoracion_pastel
ORDER BY idecpast DESC 
`);
    res.json(alldecoracion.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO PASTEL ----------------------------------------
const getDecoracion = async (req, res, next) => {
  try {
    const { idecpast } = req.params;
    const result = await pool.query(
      "SELECT * FROM decoracion_pastel WHERE idecpast = $1",
      [idecpast]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "No exisate la decoracion del pastel",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO PASTEL ------------------
const crearDecoracion = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { decoracion } = req.body;
    const result = await pool.query(
      "INSERT INTO decoracion_pastel (decoracion) VALUES ($1) RETURNING *",
      [decoracion]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE USUARIO -----------------------------------------
const actualizarDecoracion = async (req, res, next) => {
  const { idecpast } = req.params;
  try {
    const { decoracion } = req.body;

    const result = await pool.query(
      "UPDATE decoracion_pastel SET decoracion = $1 WHERE idecpast = $2 RETURNING *",
      [decoracion, idecpast]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "No existe la decoradion de pastel",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//---------------------- ELIMINAR USUARIO --------------------------
const eliminarDecoracion = async (req, res, next) => {
  const { idecpast } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM decoracion_pastel WHERE idecpast = $1",
      [idecpast]
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
  getAlldecoracion,
  getDecoracion,
  crearDecoracion,
  actualizarDecoracion,
  eliminarDecoracion,
};
