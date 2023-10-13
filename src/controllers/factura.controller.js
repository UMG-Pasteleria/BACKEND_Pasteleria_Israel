const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS USUARIOS --------------------------------------
const getAllfactura = async (req, res, next) => {
  try {
    const allfactura = await pool.query("SELECT *FROM factura");
    res.json(allfactura.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO USUARIO ----------------------------------------
const getfactura = async (req, res, next) => {
  try {
    const { id_factura } = req.params;
    const result = await pool.query("SELECT *FROM factura WHERE id_factura = $1", [
        id_factura,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "numero factura no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO NUMERO DE FACTURA ------------------
const crearfactura = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { num_factura, observaciones} = req.body;
    const result = await pool.query(
      "INSERT INTO factura ( num_factura, observaciones) VALUES ($1, $2 ) RETURNING *",
      //INSERT INTO usuario(iduser, nombre, apellido, telefono, email, contrasenia) VALUES (2,'juan', 'Mecanico', 3215792, 'juan@mecanico.com', 'juan123')
      [ num_factura, observaciones]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE FACTURA -----------------------------------------
const actualizarfactura = async (req, res, next) => {
  const { id_factura } = req.params;
 try{
    const {num_factura, observaciones } = req.body;

    const result = await pool.query(
      "UPDATE factura SET num_factura = $1, observaciones = $2 WHERE id_factura = $3 RETURNING *",
      [num_factura, observaciones, id_factura ]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "numero de factura no encontrado",
      });
    res.json(result.rows[0]);
 }
 catch(error){
    next(error);
 }
};

//---------------------- ELIMINAR USUARIO --------------------------
const eliminarfactura = async (req, res) => {
  const { id_factura } = req.params;
  try{
    const result = await pool.query("DELETE FROM factura WHERE id_factura = $1", [
        id_factura,
      ]);
    
      if (result.rowCount === 0)
        return res.status(404).json({
          message: "numero de factura no encontrado",
        });
    
      return res.sendStatus(204);
  }catch(error){
    next(error);
  }
};

module.exports = {
  getAllfactura,
  getfactura,
  crearfactura,
  actualizarfactura,
  eliminarfactura,
};
