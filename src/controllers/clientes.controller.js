const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS CLIENTES --------------------------------------
const getAllclientes = async (req, res, next) => {
  try {
    const allcliente = await pool.query("SELECT *FROM cliente");
    res.json(allcliente.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO CLIENTE ----------------------------------------
const getclientes = async (req, res, next) => {
  try {
    const { id_cliente } = req.params;
    const result = await pool.query("SELECT *FROM cliente WHERE id_cliente = $1", [
      id_cliente,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO CLIENTE ------------------
const crearclientes = async (req, res, next) => {
  try {
    //console.log(req.body);
    const {  nombre_cl, nit_cl, telefono_cl, direccion_cl, tipo_cliente } = req.body;
    const result = await pool.query(
      "INSERT INTO cliente ( nombre_cl, nit_cl, telefono_cl, direccion_cl, tipo_cliente) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      //INSERT INTO usuario(iduser, nombre, apellido, telefono, email, contrasenia) VALUES (2,'juan', 'Mecanico', 3215792, 'juan@mecanico.com', 'juan123')
      [ nombre_cl, nit_cl, telefono_cl, direccion_cl, tipo_cliente]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE CLIENTE -----------------------------------------
const actualizarclientes = async (req, res, next) => {
  const { id_cliente } = req.params;
 try{
    const { nombre_cl, nit_cl, telefono_cl, direccion_cl, tipo_cliente } = req.body;

    const result = await pool.query(
      "UPDATE cliente SET nombre_cl = $1, nit_cl = $2, telefono_cl = $3, direccion_cl = $4, tipo_cliente = $5 WHERE id_cliente = $6 RETURNING *",
      [nombre_cl, nit_cl, telefono_cl, direccion_cl, tipo_cliente, id_cliente]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    res.json(result.rows[0]);
 }
 catch(error){
    next(error);
 }
};

//---------------------- ELIMINAR CLIENTE --------------------------
const eliminarclientes = async (req, res) => {
  const { id_cliente } = req.params;
  try{
    const result = await pool.query("DELETE FROM cliente WHERE id_cliente = $1", [
        iduser,
      ]);
    
      if (result.rowCount === 0)
        return res.status(404).json({
          message: "Cliente no encontrado",
        });
    
      return res.sendStatus(204);
  }catch(error){
    next(error);
  }
};

module.exports = {
  getAllclientes,
  getclientes,
  crearclientes,
  actualizarclientes,
  eliminarclientes,
};
