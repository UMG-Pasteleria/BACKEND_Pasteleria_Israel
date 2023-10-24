const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS PEDIDOS --------------------------------------
const getAllpedido = async (req, res, next) => {
  try {
    const allpedido = await pool.query("SELECT * FROM pedido");
    res.json(allpedido.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO PEDIDO ----------------------------------------
const getpedido = async (req, res, next) => {
  try {
    const { idpedido } = req.params;
    const result = await pool.query("SELECT *FROM pedido WHERE idpedido = $1", [
      idpedido,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "pedido no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO PEDIDO ------------------
const crearpedido = async (req, res, next) => {
  try {
    //console.log(req.body);
    const {
      fecha_pedido,
      producto_pro,
      cantidad_pro,
      subtotal,
      total,
      id_client,
    } = req.body;
    const result = await pool.query(
      "INSERT INTO pedido ( fecha_pedido, producto_pro, cantidad_pro, subtotal, total, id_client) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      //INSERT INTO usuario(iduser, nombre, apellido, telefono, email, contrasenia) VALUES (2,'juan', 'Mecanico', 3215792, 'juan@mecanico.com', 'juan123')
      [fecha_pedido, producto_pro, cantidad_pro, subtotal, total, id_client]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE PEDIDO -----------------------------------------
const actualizarpedido = async (req, res, next) => {
  const { idpedido } = req.params;
  try {
    const {
      fecha_pedido,
      producto_pro,
      cantidad_pro,
      subtotal,
      total,
      id_client,
    } = req.body;

    const result = await pool.query(
      "UPDATE pedido SET fecha_pedido = $1, producto_pro = $2, cantidad_pro = $3, subtotal = $4, total=$5, id_client = $6 WHERE idpedido = $7 RETURNING *",
      [
        fecha_pedido,
        producto_pro,
        cantidad_pro,
        subtotal,
        total,
        id_client,
        idpedido,
      ]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "pedido no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//---------------------- ELIMINAR PEDIDO  --------------------------
const eliminarpedido = async (req, res) => {
  const { idpedido } = req.params;
  try {
    const result = await pool.query("DELETE FROM pedido WHERE idpedido = $1", [
      idpedido,
    ]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Pedido no encontrado",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllpedido,
  getpedido,
  crearpedido,
  actualizarpedido,
  eliminarpedido,
};
