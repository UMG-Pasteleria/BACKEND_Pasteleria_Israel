const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS USUARIOS --------------------------------------
const getPastelesVendidos = async (req, res, next) => {
  try {
    const allpsatel = await pool.query(`
      SELECT pedido.pastel_idped, pastel.pastel, SUM(pedido.cantidad) AS "total"
FROM pedido
JOIN pastel ON pedido.pastel_idped = pastel.idpastel
GROUP BY pedido.pastel_idped, pastel.pastel;

`);
    res.json(allpsatel.rows);
  } catch (error) {
    next(error);
  }
};
const getVentas = async (req, res, next) => {
  try {
    const AllVentas = await pool.query(`
 
SELECT pedido.fecha_entrega::DATE, SUM(pedido.cantidad * pastel.precio) AS total
FROM pedido
INNER JOIN pastel ON pedido.pastel_idped = pastel.idpastel
GROUP BY pedido.fecha_entrega::DATE
ORDER BY pedido.fecha_entrega::DATE DESC
`);
    res.json(AllVentas.rows);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPastelesVendidos,
  getVentas,
};
