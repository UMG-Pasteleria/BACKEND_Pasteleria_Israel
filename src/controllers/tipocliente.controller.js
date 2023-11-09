const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS USUARIOS --------------------------------------
const getAlltipocliente = async (req, res, next) => {
  try {
    const alltipocliente = await pool.query(`SELECT * FROM tipo_cliente`);
    res.json(alltipocliente.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO USUARIO ----------------------------------------
const gettipocliente = async (req, res, next) => {
  try {
    const { idtcl } = req.params;
    const result = await pool.query(
      "SELECT * FROM tipo_cliente WHERE idtcl = $1",
      [idtcl]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "tipo de cliente no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO USUARIO ------------------
const creartipocliente = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { tipo_cl } = req.body;
    const result = await pool.query(
      "INSERT INTO tipo_cliente ( tipo_cl ) VALUES ($1) RETURNING *",

      [tipo_cl]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE USUARIO -----------------------------------------
const actualizartipocliente = async (req, res, next) => {
  const { idtcl } = req.params;
  try {
    const { tipo_cl } = req.body;

    const result = await pool.query(
      "UPDATE tipo_cliente SET tipo_cl = $1 WHERE idtcl = $2 RETURNING *",
      [tipo_cl, idtcl]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "tipo cliente no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//---------------------- ELIMINAR USUARIO --------------------------
const eliminartipocliente = async (req, res, next) => {
  const { idtcl } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM tipo_cliente WHERE idtcl = $1",
      [idtcl]
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
  getAlltipocliente,
  gettipocliente,
  creartipocliente,
  actualizartipocliente,
  eliminartipocliente,
};
