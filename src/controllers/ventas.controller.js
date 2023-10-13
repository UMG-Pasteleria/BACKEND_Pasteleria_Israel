const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS USUARIOS --------------------------------------
const getAllventa = async (req, res, next) => {
  try {
    const allventa = await pool.query("SELECT *FROM venta");
    res.json(allventa.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO USUARIO ----------------------------------------
const getventa = async (req, res, next) => {
  try {
    const { id_venta } = req.params;
    const result = await pool.query("SELECT *FROM venta WHERE id_venta = $1", [
      id_venta,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "ventas no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO USUARIO ------------------
const crearventa = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { fecha, cantidad, total, nom_cliente, ti_pago, numero_fact, nom_producto, descripcion} = req.body;
    const result = await pool.query(
      "INSERT INTO venta ( fecha, cantidad, total, nom_cliente, ti_pago, numero_fact, nom_producto, descripcion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      
      [ fecha, cantidad, total, nom_cliente, ti_pago, numero_fact, nom_producto, descripcion]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE VENTAS -----------------------------------------
const actualizarventa = async (req, res, next) => {
  const { id_venta } = req.params;
 try{
    const { fecha, cantidad, total, nom_cliente, ti_pago, numero_fact, nom_producto, descripcion } = req.body;

    const result = await pool.query(
      "UPDATE usuario SET fecha = $1, cantidad = $2, total = $3, nom_cliente = $4, ti_pago = $5, numero_fact = $6, nom_producto = $7, descripcion = $8 WHERE idu_venta = $9 RETURNING *",
      [fecha, cantidad, total, nom_cliente, ti_pago, numero_fact, nom_producto, descripcion, id_venta]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Venta no encontrado",
      });
    res.json(result.rows[0]);
 }
 catch(error){
    next(error);
 }
};

//---------------------- ELIMINAR VENTAS --------------------------
const eliminarventa = async (req, res) => {
  const { id_venta } = req.params;
  try{
    const result = await pool.query("DELETE FROM venta WHERE id_venta = $1", [
        id_venta,
      ]);
    
      if (result.rowCount === 0)
        return res.status(404).json({
          message: "venta no encontrada",
        });
    
      return res.sendStatus(204);
  }catch(error){
    next(error);
  }
};

module.exports = {
  getAllventa,
  getventa,
  crearventa,
  actualizarventa,
  eliminarventa,
};
