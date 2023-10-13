const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS USUARIOS --------------------------------------
const getAlltipocliente = async (req, res, next) => {
  try {
    const alltipocliente = await pool.query("SELECT *FROM tipo_cliente");
    res.json(alltipocliente.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO USUARIO ----------------------------------------
const gettipocliente = async (req, res, next) => {
  try {
    const { idtipo_cliente } = req.params;
    const result = await pool.query("SELECT *FROM tipo_cliente WHERE idtipo_cliente = $1", [
        idtipo_cliente,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "tipo de cliente no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO USUARIO ------------------
const creartipocliente = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { nombre, cliente_id_cliente} = req.body;
    const result = await pool.query(
      "INSERT INTO tipo_cliente ( nombre, cliente_id_cliente) VALUES ($1, $2) RETURNING *",
      //INSERT INTO usuario(iduser, nombre, apellido, telefono, email, contrasenia) VALUES (2,'juan', 'Mecanico', 3215792, 'juan@mecanico.com', 'juan123')
      [ nombre, cliente_id_cliente]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE USUARIO -----------------------------------------
const actualizartipocliente = async (req, res, next) => {
  const { idtipo_cliente } = req.params;
 try{
    const { nombre, cliente_id_cliente } = req.body;

    const result = await pool.query(
      "UPDATE tipo_cliente SET nombre = $1, cliente_id_cliente = $2 WHERE idtipo_cliente = $3 RETURNING *",
      [nombre, cliente_id_cliente, idtipo_cliente]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "tipo cliente no encontrado",
      });
    res.json(result.rows[0]);
 }
 catch(error){
    next(error);
 }
};

//---------------------- ELIMINAR USUARIO --------------------------
const eliminartipocliente = async (req, res) => {
  const { idtipo_cliente } = req.params;
  try{
    const result = await pool.query("DELETE FROM tipo_cliente WHERE idtipo_cliente = $1", [
        idtipo_cliente,
      ]);
    
      if (result.rowCount === 0)
        return res.status(404).json({
          message: "Usuario no encontrado",
        });
    
      return res.sendStatus(204);
  }catch(error){
    next(error);
  }
};

module.exports = {
  getAlltipocliente,
  gettipocliente,
  creartipocliente,
  actualizartipocliente,
  eliminartipocliente,
};
