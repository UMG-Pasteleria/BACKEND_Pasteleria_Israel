const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS PRODUCTOS --------------------------------------
const getAllproducto = async (req, res, next) => {
  try {
    const allusuarios =
      await pool.query(`SELECT producto.idprod, producto.producto, producto.descripcion, producto.stock, producto.fecha_vencimiento, tipo_producto.tipo, proveedor.nombre_proveedor
FROM producto
join tipo_producto on producto.id_tipoprod = tipo_producto.idtprod
join proveedor on producto.id_prov = proveedor.idprov
`);
    res.json(allusuarios.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO PRODUCTO ----------------------------------------
const getproducto = async (req, res, next) => {
  try {
    const { idprod } = req.params;
    const result = await pool.query(
      `SELECT producto.idprod, producto.producto, producto.descripcion, producto.stock, producto.fecha_vencimiento, tipo_producto.tipo, proveedor.nombre_proveedor
FROM producto
join tipo_producto on producto.id_tipoprod = tipo_producto.idtprod
join proveedor on producto.id_prov = proveedor.idprov
WHERE idprod =  $1`,
      [idprod]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "producto no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO Productp ------------------
const crearproducto = async (req, res, next) => {
  try {
    //console.log(req.body);
    const {
      producto,
      descripcion,
      stock,
      fecha_vencimiento,
      id_tipoprod,
      id_prov,
    } = req.body;
    const result = await pool.query(
      "INSERT INTO producto ( producto, descripcion, stock,fecha_vencimiento, id_tipoprod, id_prov) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      //INSERT INTO usuario(iduser, nombre, apellido, telefono, email, contrasenia) VALUES (2,'juan', 'Mecanico', 3215792, 'juan@mecanico.com', 'juan123')
      [producto, descripcion, stock, fecha_vencimiento, id_tipoprod, id_prov]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE PRODUCTO -----------------------------------------
const actualizarproducto = async (req, res, next) => {
  const { idprod } = req.params;
  try {
    const {
      producto,
      descripcion,
      stock,
      fecha_vencimiento,
      id_tipoprod,
      id_prov,
    } = req.body;

    const result = await pool.query(
      "UPDATE producto SET producto = $1, descripcion = $2,stock = $3, fechav_encimiento = $4, id_tipopriod = $5, id_prov = $6 WHERE idprod = $7 RETURNING *",
      [
        producto,
        descripcion,
        stock,
        fecha_vencimiento,
        id_tipoprod,
        id_prov,
        idprod,
      ]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "producto no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//---------------------- ELIMINAR USUARIO --------------------------
const eliminarproducto = async (req, res, next) => {
  const { idprod } = req.params;
  try {
    const result = await pool.query("DELETE FROM producto WHERE idprod = $1", [
      idprod,
    ]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "producto no encontrado",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllproducto,
  getproducto,
  crearproducto,
  actualizarproducto,
  eliminarproducto,
};
