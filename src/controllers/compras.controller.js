const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS COMPRAS --------------------------------------
const getallcompras = async (req, res, next) => {
  try {
    const allcompras = await pool.query("SELECT *FROM compras");
    res.json(allcompras.rows);
  } catch (error) {
    next(error);
  }
};


// segundo intento


//------------------------------------- MOSTRAR UN SOLO COMPRAS ----------------------------------------
const getcompras = async (req, res, next) => {
  try {
    const { idcompras } = req.params;
    const result = await pool.query("SELECT *FROM compras WHERE idcompras = $1", [
      idcompras,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "compra no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO COMPRA ------------------
const crearcompras = async (req, res, next) => {
  try {
    //console.log(req.body); 
    const { responsable, metdpago, emision, entrega } = req.body;
    const result = await pool.query(
      "INSERT INTO compras (  responsable, metdpago, emision, entrega) VALUES ($1, $2, $3, $4 ) RETURNING *",
     
      [  responsable, metdpago, emision, entrega]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE COMPRAS -----------------------------------------
const actualizarcompras = async (req, res, next) => {
  const { idcompras } = req.params;
 try{
    const {  responsable, metdpago, emision, entrega } = req.body;

    const result = await pool.query(
      "UPDATE compras SET responsable = $1, metdpago = $2, emision = $3, entrega = $4 WHERE idcompras = $6 RETURNING *",
      [responsable, metdpago, emision, entrega , idcompras]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "compra no encontrado",
      });
    res.json(result.rows[0]);
 }
 catch(error){
    next(error);
 }
};

//preuba de rama remortaresponsable, metdpago, emision, entrega 

//---------------------- ELIMINAR DATO COMPRA --------------------------
const eliminarcompras = async (req, res) => {
  const { idcompras } = req.params;
  try{
    const result = await pool.query("DELETE FROM compras WHERE idcompras = $1", [
        idcompras      ]);
    
      if (result.rowCount === 0)
        return res.status(404).json({
          message: "Compra no encontrado",
        });
    
      return res.sendStatus(204);
  }catch(error){
    next(error);
  }
};

module.exports = {
  getallcompras,
  getcompras,
  crearcompras,
  actualizarcompras,
  eliminarcompras,
};
