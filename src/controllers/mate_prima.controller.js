const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS USUARIOS --------------------------------------
const getAllmate_prima = async (req, res, next) => {
  try {
    const allmate_prima = await pool.query("SELECT *FROM mate_prima");
    res.json(allmate_prima.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO USUARIO ----------------------------------------
const getmate_prima = async (req, res, next) => {
  try {
    const { id_mateprima } = req.params;
    const result = await pool.query("SELECT *FROM mate_prima WHERE id_mateprima = $1", [
      id_mateprima,
    ]);
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
const crearmate_prima = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { producto, cantidad, marca, precio, fechavencimiento, observacion, categoria} = req.body;
    const result = await pool.query(
      "INSERT INTO mate_prima ( producto, cantidad, marca, precio, fechavencimiento, observacion, categoria) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      //INSERT INTO usuario(iduser, nombre, apellido, telefono, email, contrasenia) VALUES (2,'juan', 'Mecanico', 3215792, 'juan@mecanico.com', 'juan123')
      [ producto, cantidad, marca, precio, fechavencimiento, observacion, categoria]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE USUARIO -----------------------------------------
const actualizarmate_prima = async (req, res, next) => {
  const { id_mateprima } = req.params;
 try{
    const { producto, cantidad, marca, precio, fechavencimiento, observacion, categoria } = req.body;

    const result = await pool.query(
      "UPDATE mate_prima SET producto = $1, cantidad = $2, marca = $3, precio = $4, fechavencimiento = $5, observacion = $6, categoria = $7 WHERE id_mateprima = $8 RETURNING *",
      [producto, cantidad, marca, precio, fechavencimiento, observacion, categoria, id_mateprima]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    res.json(result.rows[0]);
 }
 catch(error){
    next(error);
 }
};

//---------------------- ELIMINAR USUARIO --------------------------
const eliminarmate_prima = async (req, res) => {
  const { id_mateprima } = req.params;
  try{
    const result = await pool.query("DELETE FROM mate_prima WHERE id_mateprima = $1", [
        id_mateprima,
      ]);
    
      if (result.rowCount === 0)
        return res.status(404).json({
          message: "Producto no encontrado",
        });
    
      return res.sendStatus(204);
  }catch(error){
    next(error);
  }
};

module.exports = {
  getAllmate_prima,
  getmate_prima,
  crearmate_prima,
  actualizarmate_prima,
  eliminarmate_prima,
};
