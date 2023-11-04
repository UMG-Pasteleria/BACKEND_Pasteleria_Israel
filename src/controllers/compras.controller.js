const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS COMPRAS --------------------------------------
const getallcompras = async (req, res, next) => {
  try {
    const allcompras = await pool.query(
      `SELECT compra.idcompra, compra.fecha_compra, usuario.nombre_u, proveedor.nombre_proveedor, compra.descripcion, detalle_compra.total  
FROM compra
join proveedor on compra.prov_idcomp = proveedor.idprov
join usuario on compra.user_idcomp = usuario.iduser
join detalle_compra on compra.detalle_idcomp = detalle_compra.idetallec`
    );
    res.json(allcompras.rows);
  } catch (error) {
    next(error);
  }
};

// segundo intento

//------------------------------------- MOSTRAR UN SOLO COMPRAS ----------------------------------------
const getcompras = async (req, res, next) => {
  try {
    const { idcompra } = req.params;
    const result = await pool.query("SELECT *FROM compra WHERE idcompra = $1", [
      idcompra,
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
    const { prov_idcomp, user_idcomp, fecha_compra } = req.body;
    const result = await pool.query(
      "INSERT INTO compra ( prov_idcomp, user_idcomp, fecha_compra ) VALUES ($1, $2, $3 ) RETURNING *",

      [prov_idcomp, user_idcomp, fecha_compra]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE COMPRAS -----------------------------------------
const actualizarcompras = async (req, res, next) => {
  const { idcompra } = req.params;
  try {
    const { prov_idcomp, user_idcomp, fecha_compra } = req.body;

    const result = await pool.query(
      "UPDATE compra SET prov_idcomp = $1, user_idcomp = $2, fecha_compra = $3 WHERE idcompra = $4 RETURNING *",
      [prov_idcomp, user_idcomp, fecha_compra, idcompra]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "compra no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//preuba de rama remortaresponsable, metdpago, emision, entrega

//---------------------- ELIMINAR DATO COMPRA --------------------------
const eliminarcompras = async (req, res, next) => {
  const { idcompra } = req.params;
  try {
    const result = await pool.query("DELETE FROM compras WHERE idcompra = $1", [
      idcompra,
    ]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Compra no encontrado",
      });

    return res.sendStatus(204);
  } catch (error) {
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
