const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS CLIENTES --------------------------------------
const getAllclientes = async (req, res, next) => {
  try {
    const allcliente =
      await pool.query(`select cliente.idcliente, cliente.nombre_cl, cliente.nit_cl, cliente.telefono_cl, cliente.direccion_cl, tipo_cliente.tipo_cl

from cliente
join tipo_cliente on cliente.tipo_idtclient = tipo_cliente.idtcl

ORDER BY idcliente DESC`);
    res.json(allcliente.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO CLIENTE ----------------------------------------
const getclientes = async (req, res, next) => {
  try {
    const { idcliente } = req.params;
    const result = await pool.query(
      "SELECT *  FROM cliente where idcliente = $1",
      [idcliente]
    );
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
    const { nombre_cl, nit_cl, telefono_cl, direccion_cl, tipo_idtclient } =
      req.body;
    const result = await pool.query(
      "INSERT INTO cliente ( nombre_cl, nit_cl, telefono_cl, direccion_cl, tipo_idtclient) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      //INSERT INTO usuario(iduser, nombre, apellido, telefono, email, contrasenia) VALUES (2,'juan', 'Mecanico', 3215792, 'juan@mecanico.com', 'juan123')
      [nombre_cl, nit_cl, telefono_cl, direccion_cl, tipo_idtclient]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE CLIENTE -----------------------------------------
const actualizarclientes = async (req, res, next) => {
  const { idcliente } = req.params;
  try {
    const { nombre_cl, nit_cl, telefono_cl, direccion_cl, tipo_idclient } =
      req.body;

    const result = await pool.query(
      "UPDATE cliente SET nombre_cl = $1, nit_cl = $2, telefono_cl = $3, direccion_cl = $4, tipo_idtclient = $5 WHERE idcliente = $6 RETURNING *",
      [nombre_cl, nit_cl, telefono_cl, direccion_cl, tipo_idclient, idcliente]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//---------------------- ELIMINAR CLIENTE --------------------------
const eliminarclientes = async (req, res, next) => {
  const { idcliente } = req.params;
  try {
    const result = await pool.query(
      "DELETE  FROM cliente WHERE idcliente = $1",
      [idcliente]
    );

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Cliente no encontrado",
      });

    return res.sendStatus(204);
  } catch (error) {
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
