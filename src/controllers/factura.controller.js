const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS USUARIOS --------------------------------------
const getAllfactura = async (req, res, next) => {
  try {
    const allfactura = await pool.query(`
    SELECT detalle_compra.idetallec, proveedor.nombre_proveedor, compra.fecha_compra, detalle_compra.cantidad, detalle_compra.costo_unitario, detalle_compra.total
FROM detalle_compra
join proveedor on detalle_compra.prov_idetcomp = proveedor.idprov
join compra on detalle_compra.comp_idetcomp = compra.idcompra`);
    res.json(allfactura.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO USUARIO ----------------------------------------
const getfactura = async (req, res, next) => {
  try {
    const { idetallec } = req.params;
    const result = await pool.query(
      "SELECT *FROM detalle_compra WHERE idetallec = $1",
      [idetallec]
    );
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
    const {
      porv_idetcomp,
      comp_idetcomp,
      prod_idetcomp,
      cantidad,
      costo_unitario,
      total,
    } = req.body;
    const result = await pool.query(
      "INSERT INTO detalle_compra ( porv_idetcomp, comp_idetcomp, prod_idetcomp, cantidad, costo_unitario, total) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *",
      //INSERT INTO usuario(iduser, nombre, apellido, telefono, email, contrasenia) VALUES (2,'juan', 'Mecanico', 3215792, 'juan@mecanico.com', 'juan123')
      [
        porv_idetcomp,
        comp_idetcomp,
        prod_idetcomp,
        cantidad,
        costo_unitario,
        total,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE FACTURA -----------------------------------------
const actualizarfactura = async (req, res, next) => {
  const { idetallec } = req.params;
  try {
    const {
      porv_idetcomp,
      comp_idetcomp,
      prod_idetcomp,
      cantidad,
      costo_unitario,
      total,
    } = req.body;

    const result = await pool.query(
      "UPDATE detalle_compra SET prov_idetcomp = $1, comp_idetcomp, = $2, prod_idetcomp = $3, cantidad = $4, costo_unitario = $5, total = $6  WHERE idetallec = $7 RETURNING *",
      [
        porv_idetcomp,
        comp_idetcomp,
        prod_idetcomp,
        cantidad,
        costo_unitario,
        total,
        idetallec,
      ]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "numero de factura no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//---------------------- ELIMINAR USUARIO --------------------------
const eliminarfactura = async (req, res, next) => {
  const { idetallec } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM detalle_compra WHERE idetallec = $1",
      [idetallec]
    );

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "factura no encontrado",
      });

    return res.sendStatus(204);
  } catch (error) {
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
