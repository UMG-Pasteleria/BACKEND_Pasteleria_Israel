const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS USUARIOS --------------------------------------
const getAllventa = async (req, res, next) => {
  try {
    const allventa =
      await pool.query(`select  venta.idventa, pedido.fecha_pedido, cliente.nombre_cl, pastel.pastel,  tamanio_pastel.tamanio, decoracion_pastel.decoracion, pedido.cantidad, pedido.total, cliente.direccion_cl, cliente.telefono_cl, estado_pedido.estado 

from venta
join pedido on venta.idventa = pedido.idpedido
join cliente on pedido.cliente_idped = cliente.idcliente
join pastel on pedido.pastel_idped = pastel.idpastel
join tamanio_pastel on pastel.tamanio_idpast = tamanio_pastel.idtampast
join decoracion_pastel on pastel.dec_idpast = decoracion_pastel.idecpast
join estado_pedido on pedido.estado_idped = estado_pedido.idestadop
`);
    res.json(allventa.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO USUARIO ----------------------------------------
const getventa = async (req, res, next) => {
  try {
    const { idventa } = req.params;
    const result = await pool.query(
      `select  venta.idventa, pedido.fecha_pedido, cliente.nombre_cl, pastel.pastel,  tamanio_pastel.tamanio, decoracion_pastel.decoracion, pedido.cantidad, pedido.total, cliente.direccion_cl, cliente.telefono_cl, estado_pedido.estado 

from venta
join pedido on venta.idventa = pedido.idpedido
join cliente on pedido.cliente_idped = cliente.idcliente
join pastel on pedido.pastel_idped = pastel.idpastel
join tamanio_pastel on pastel.tamanio_idpast = tamanio_pastel.idtampast
join decoracion_pastel on pastel.dec_idpast = decoracion_pastel.idecpast
join estado_pedido on pedido.estado_idped = estado_pedido.idestadop

    
    WHERE id_venta = $1`,
      [idventa]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "venta no encontrado",
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
    const { pedido_idvent } = req.body;
    const result = await pool.query(
      "INSERT INTO venta (pedido_idvent) VALUES ($1) RETURNING *",

      [pedido_idvent]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE VENTAS -----------------------------------------
const actualizarventa = async (req, res, next) => {
  const { idventa } = req.params;
  try {
    const { pedido_idvent } = req.body;

    const result = await pool.query(
      "UPDATE usuario SET pedido_idvent = $1 WHERE idu_venta = $9 RETURNING *",
      [pedido_idvent, idventa]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Venta no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//---------------------- ELIMINAR VENTAS --------------------------
const eliminarventa = async (req, res, next) => {
  const { idventa } = req.params;
  try {
    const result = await pool.query("DELETE FROM venta WHERE idventa = $1", [
      idventa,
    ]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "venta no encontrada",
      });

    return res.sendStatus(204);
  } catch (error) {
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
