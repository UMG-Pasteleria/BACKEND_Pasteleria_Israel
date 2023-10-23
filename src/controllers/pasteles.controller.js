const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS USUARIOS --------------------------------------
const getAllpsatel = async (req, res, next) => {
  try {
    const allpsatel = await pool.query("SELECT *FROM pastel");
    res.json(allpsatel.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO USUARIO ----------------------------------------
const getpsatel = async (req, res, next) => {
  try {
    const { idpastel } = req.params;
    const result = await pool.query("SELECT *FROM pastel WHERE idpastel = $1", [
      idpastel,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Pastel no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO USUARIO ------------------
const crearpsatel = async (req, res, next) => {
  try {
    //console.log(req.body);
    const {
      precio_pastel,
      nombre_past,
      tamanio,
      descripcion_pastel,
      decoracion,
      sabor,
    } = req.body;
    const result = await pool.query(
      "INSERT INTO pastel (precio_pastel, nombre_past, tamanio, descripcion_pastel, decoracion, sabor) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      //INSERT INTO usuario(iduser, nombre, apellido, telefono, email, contrasenia) VALUES (2,'juan', 'Mecanico', 3215792, 'juan@mecanico.com', 'juan123')
      [
        precio_pastel,
        nombre_past,
        tamanio,
        descripcion_pastel,
        decoracion,
        sabor,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE USUARIO -----------------------------------------
const actualizarpsatel = async (req, res, next) => {
  const { idpastel } = req.params;
  try {
    const {
      precio_pastel,
      nombre_past,
      tamanio,
      descripcion_pastel,
      decoracion,
      sabor,
    } = req.body;

    const result = await pool.query(
      "UPDATE pastel SET precio_pastel = $1, nombre_past = $2, tamanio = $3, descripcion_pastel = $4, decoracion = $5,sabor = $6 WHERE idpastel = $7 RETURNING *",
      [
        precio_pastel,
        nombre_past,
        tamanio,
        descripcion_pastel,
        decoracion,
        sabor,
        idpastel,
      ]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Pastel no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//---------------------- ELIMINAR USUARIO --------------------------
const eliminarpsatel = async (req, res) => {
  const { idpastel } = req.params;
  try {
    const result = await pool.query("DELETE FROM pastel WHERE idpastel = $1", [
      idpastel,
    ]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Pastel no encontrado",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllpsatel,
  getpsatel,
  crearpsatel,
  actualizarpsatel,
  eliminarpsatel,
};
