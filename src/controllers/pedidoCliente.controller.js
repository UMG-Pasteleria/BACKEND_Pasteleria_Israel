const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS PEDIDOS --------------------------------------
const getAllpedido = async (req, res, next) => {
  try {
    const allpedido = await pool.query(
      `

select pedido.idpedido, pedido.fecha_pedido, cliente.nombre_cl, pastel.pastel, pastel.precio,  tamanio_pastel.tamanio, decoracion_pastel.decoracion, pedido.dedicatoria, pedido.cantidad, pedido.total, cliente.direccion_cl, cliente.telefono_cl, pedido.anticipo, pedido. fecha_entrega, estado_pedido.estado 
from pedido
join cliente on pedido.cliente_idped = cliente.idcliente
join pastel on pedido.pastel_idped = pastel.idpastel
join tamanio_pastel on pastel.tamanio_idpast = tamanio_pastel.idtampast
join decoracion_pastel on pastel.dec_idpast = decoracion_pastel.idecpast
join estado_pedido on pedido.estado_idped = estado_pedido.idestadop
ORDER BY idpedido DESC 
`
    );
    res.json(allpedido.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO PEDIDO ----------------------------------------
const getpedido = async (req, res, next) => {
  try {
    const { idpedido } = req.params;
    const result = await pool.query(
      `

select pedido.idpedido, pedido.fecha_pedido, cliente.nombre_cl, pastel.pastel, pastel.precio,  tamanio_pastel.tamanio, decoracion_pastel.decoracion, pedido.dedicatoria, pedido.cantidad, pedido.total, cliente.direccion_cl, cliente.telefono_cl, pedido.anticipo, pedido. fecha_entrega, estado_pedido.estado 
from pedido
join cliente on pedido.cliente_idped = cliente.idcliente
join pastel on pedido.pastel_idped = pastel.idpastel
join tamanio_pastel on pastel.tamanio_idpast = tamanio_pastel.idtampast
join decoracion_pastel on pastel.dec_idpast = decoracion_pastel.idecpast
join estado_pedido on pedido.estado_idped = estado_pedido.idestadop
WHERE idpedido = $1
`,
      [idpedido]
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
//---------------CREAR UN NUEVO PEDIDO ------------------
const crearpedido = async (req, res, next) => {
  try {
    const Fecha = new Date();
    const {
      cantidad,
      total,
      dedicatoria,
      fecha_entrega,
      anticipo,
      id_cliente,
      id_pastel,
      id_estado,
      id_modopago,
    } = req.body;
    const result = await pool.query(
      `INSERT INTO pedido(fecha_pedido, cantidad, total, dedicatoria, fecha_entrega, anticipo, cliente_idped, pastel_idped, estado_idped, modopago_idped) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        Fecha,
        cantidad,
        total,
        dedicatoria,
        fecha_entrega,
        anticipo,
        id_cliente,
        id_pastel,
        id_estado,
        id_modopago,
      ]
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
const eliminarpedido = async (req, res, next) => {
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
