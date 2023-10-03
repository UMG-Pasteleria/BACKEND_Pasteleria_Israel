const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS PROVEEDORES --------------------------------------
const getallproveedores = async (req, res, next) => {
  try {
    const allproveedores = await pool.query("SELECT *FROM proveedores");
    res.json(allproveedores.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO PROVEEDOR ----------------------------------------
const getproveedores = async (req, res, next) => {
  try {
    const { idprov } = req.params;
    const result = await pool.query("SELECT *FROM proveedores WHERE idprov = $1", [
      idprov,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Proveedor no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO PROVEEEDOR ------------------
const crearproveedores = async (req, res, next) => {
  try {
    //console.log(req.body); 
    const {  proveedor, nit, telefono, email, direccion } = req.body;
    const result = await pool.query(
      "INSERT INTO proveedores (  proveedor, nit, telefono, email, direccion) VALUES ($1, $2, $3, $4, $5 ) RETURNING *",
     
      [  proveedor, nit, telefono, email, direccion]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE PROVEEDORES -----------------------------------------
const actualizarproveedores = async (req, res, next) => {
  const { idprov } = req.params;
 try{
    const { proveedor, nit, telefono, email, direccion } = req.body;

    const result = await pool.query(
      "UPDATE proveedores SET proveedor = $1, nit = $2, telefono = $3, email = $4, direccion = $5 WHERE idprov = $6 RETURNING *",
      [proveedor, nit, telefono, email, direccion, idprov]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "proveedor no encontrado",
      });
    res.json(result.rows[0]);
 }
 catch(error){
    next(error);
 }
};

//---------------------- ELIMINAR USUARIO --------------------------
const eliminarproveedores = async (req, res) => {
  const { idprov } = req.params;
  try{
    const result = await pool.query("DELETE FROM proveedores WHERE idprov = $1", [
        idprov      ]);
    
      if (result.rowCount === 0)
        return res.status(404).json({
          message: "Proveedor no encontrado",
        });
    
      return res.sendStatus(204);
  }catch(error){
    next(error);
  }
};

module.exports = {
  getallproveedores,
  getproveedores,
  crearproveedores,
  actualizarproveedores,
  eliminarproveedores,
};
