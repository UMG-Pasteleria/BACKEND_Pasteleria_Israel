const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS PROVEEDORES --------------------------------------
const getallproveedores = async (req, res, next) => {
  try {
    const allproveedores = await pool.query("SELECT *FROM proveedor");
    res.json(allproveedores.rows);
  } catch (error) {
    next(error);
  }
};

// segundo intento

//------------------------------------- MOSTRAR UN SOLO PROVEEDOR ----------------------------------------
const getproveedores = async (req, res, next) => {
  try {
    const { idprov } = req.params;
    const result = await pool.query(
      "SELECT *FROM proveedor WHERE idprov = $1",
      [idprov]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Proveedor no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO PROVEEEDOR ------------------
const crearproveedores = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { telefono_pr, correo_pr, direccion_pr, nit_pr, nombre_pr } =
      req.body;
    const result = await pool.query(
      "INSERT INTO proveedor ( telefono_pr, correo_pr, direccion_pr, nit_pr, nombre_pr) VALUES ($1, $2, $3, $4, $5 ) RETURNING *",

      [telefono_pr, correo_pr, direccion_pr, nit_pr, nombre_pr]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
`INSERT INTO pedido(fecha_pedido, cantidad, total, cliente_idped, pastel_idped, estado_idped, modopago_idped) 
VLAUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
  [Fecha, cantidad, total, id_cliente, id_pastel, id_estado, id_modopago];
//--------------------- ACTUALIZAR DATOS DE PROVEEDORES -----------------------------------------
const actualizarproveedores = async (req, res, next) => {
  const { idprov } = req.params;
  try {
    const { nombre_pr, telefono_pr, correo_pr, direccion_pr, nit_pr } =
      req.body;

    const result = await pool.query(
      "UPDATE proveedor SET nombre_pr = $1, telefono_pr = $2, correo_pr = $3, direccion_pr = $4, nit_pr = $5 WHERE idprov = $6 RETURNING *",
      [nombre_pr, telefono_pr, correo_pr, direccion_pr, nit_pr, idprov]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "proveedor no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//preuba de rama remorta

//---------------------- ELIMINAR USUARIO --------------------------
const eliminarproveedores = async (req, res) => {
  const { idprov } = req.params;
  try {
    const result = await pool.query("DELETE FROM proveedor WHERE idprov = $1", [
      idprov,
    ]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Proveedor no encontrado",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getallproveedores,
  getproveedores,
  crearproveedores,
  actualizarproveedores,
  eliminarproveedores,
};
