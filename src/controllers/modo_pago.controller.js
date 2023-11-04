const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS USUARIOS --------------------------------------
const getAllmodo_pago = async (req, res, next) => {
  try {
    const allmodo_pago = await pool.query("SELECT *FROM modo_pago");
    res.json(allmodo_pago.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO USUARIO ----------------------------------------
const getmodo_pago = async (req, res, next) => {
  try {
    const { idmodp } = req.params;
    const result = await pool.query(
      "SELECT *FROM modo_pago WHERE idmodp = $1",
      [idmodp]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "tipo de pago no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO MODO DE PAGO ------------------
const crearmodo_pago = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { modo } = req.body;
    const result = await pool.query(
      "INSERT INTO modo_pago ( modo) VALUES ($1 ) RETURNING *",
      //INSERT INTO usuario(iduser, nombre, apellido, telefono, email, contrasenia) VALUES (2,'juan', 'Mecanico', 3215792, 'juan@mecanico.com', 'juan123')
      [modo]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE MODO DE PAGO -----------------------------------------
const actualizarmodo_pago = async (req, res, next) => {
  const { idmodp } = req.params;
  try {
    const { modo } = req.body;

    const result = await pool.query(
      "UPDATE modo_pago SET nombre_mopago = $1 WHERE id_modopago = $2 RETURNING *",
      [modo, idmodp]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "tipo de pago no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//---------------------- ELIMINAR USUARIO --------------------------
const eliminarmodo_pago = async (req, res, next) => {
  const { idmodp } = req.params;
  try {
    const result = await pool.query("DELETE FROM modo_pago WHERE idmodp = $1", [
      idmodp,
    ]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "tipo de pago no encontrado",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllmodo_pago,
  getmodo_pago,
  crearmodo_pago,
  actualizarmodo_pago,
  eliminarmodo_pago,
};
