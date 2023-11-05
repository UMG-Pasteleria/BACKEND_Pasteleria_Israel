const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS USUARIOS --------------------------------------
const getAllpsatel = async (req, res, next) => {
  try {
    const allpsatel =
      await pool.query(`SELECT pastel.idpastel, pastel.pastel, pastel.precio, tamanio_pastel.tamanio, decoracion_pastel.decoracion, categoria_pastel.categoria
FROM pastel
join decoracion_pastel on pastel.dec_idpast = decoracion_pastel.idecpast
join categoria_pastel on pastel.cat_idpast = categoria_pastel.idcatp
join tamanio_pastel on pastel.tamanio_idpast = tamanio_pastel.idtampast
ORDER BY idpastel DESC 
`);
    res.json(allpsatel.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO PASTEL ----------------------------------------
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
//---------------CREAR UN NUEVO PASTEL ------------------
const crearpsatel = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { pastel, precio, tamanio_idpast, dec_idpast, cat_idpast } = req.body;
    const result = await pool.query(
      "INSERT INTO pastel (pastel, precio, tamanio_idpast, dec_idpast, cat_idpast) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      //INSERT INTO usuario(iduser, nombre, apellido, telefono, email, contrasenia) VALUES (2,'juan', 'Mecanico', 3215792, 'juan@mecanico.com', 'juan123')
      [pastel, precio, tamanio_idpast, dec_idpast, cat_idpast]
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
    const { pastel, precio, tamanio_idpast, dec_idpast, cat_idpast } = req.body;

    const result = await pool.query(
      "UPDATE pastel SET pastel = $1, precio = $2, tamanio_idpast = $3, dec_idpast = $4, cat_idpast = $5 WHERE idpastel = $6 RETURNING *",
      [pastel, precio, tamanio_idpast, dec_idpast, cat_idpast, idpastel]
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
const eliminarpsatel = async (req, res, next) => {
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
