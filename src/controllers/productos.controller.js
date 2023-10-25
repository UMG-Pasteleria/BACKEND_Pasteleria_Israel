const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS USUARIOS --------------------------------------
const getAllproducto = async (req, res, next) => {
  try {
    const allusuarios = await pool.query("SELECT * FROM producto");
    res.json(allusuarios.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO USUARIO ----------------------------------------
const getproducto = async (req, res, next) => {
  try {
    const { id_producto } = req.params;
    const result = await pool.query(
      "SELECT *FROM producto WHERE idu_producto = $1",
      [id_producto]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "producto no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO USUARIO ------------------
const crearproducto = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { descripcion_prod, peso_prod, fechavencimiento, nombre_prod } =
      req.body;
    const result = await pool.query(
      "INSERT INTO producto ( descripcion_prod, peso_prod, fechavencimiento, nombre_prod) VALUES ($1, $2, $3, $4) RETURNING *",
      //INSERT INTO usuario(iduser, nombre, apellido, telefono, email, contrasenia) VALUES (2,'juan', 'Mecanico', 3215792, 'juan@mecanico.com', 'juan123')
      [descripcion_prod, peso_prod, fechavencimiento, nombre_prod]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE USUARIO -----------------------------------------
const actualizarproducto = async (req, res, next) => {
  const { id_producto } = req.params;
  try {
    const { descripcion_prod, peso_prod, fechavencimiento, nombre_prod } =
      req.body;

    const result = await pool.query(
      "UPDATE producto SET descripcion_prod = $1, peso_prod = $2, fechavencimiento = $3, nombre_prod = $4 WHERE id_producto = $5 RETURNING *",
      [descripcion_prod, peso_prod, fechavencimiento, nombre_prod, id_producto]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "producto no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//---------------------- ELIMINAR USUARIO --------------------------
const eliminarproducto = async (req, res) => {
  const { id_producto } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM producto WHERE id_producto = $1",
      [id_producto]
    );

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "producto no encontrado",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllproducto,
  getproducto,
  crearproducto,
  actualizarproducto,
  eliminarproducto,
};
