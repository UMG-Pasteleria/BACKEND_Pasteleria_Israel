const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS CATEGORIAS --------------------------------------
const getAllcategoria = async (req, res, next) => {
  try {
    const allcategoria = await pool.query("SELECT *FROM categoria_pastel");
    res.json(allcategoria.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO CATEGORAI ----------------------------------------
const getcategoria = async (req, res, next) => {
  try {
    const { idcatp } = req.params;
    const result = await pool.query(
      "SELECT *FROM categoria_pastel WHERE idcatp = $1",
      [idcatp]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "categoria no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO CATEGORIA ------------------
const crearcategoria = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { categoria } = req.body;
    const result = await pool.query(
      "INSERT INTO categoria_pastel ( categoria) VALUES ($1 ) RETURNING *",
      //INSERT INTO usuario(iduser, nombre, apellido, telefono, email, contrasenia) VALUES (2,'juan', 'Mecanico', 3215792, 'juan@mecanico.com', 'juan123')
      [categoria]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE CATEGORIA -----------------------------------------
const actualizarcategoria = async (req, res, next) => {
  const { idcatp } = req.params;
  try {
    const { categoria } = req.body;

    const result = await pool.query(
      "UPDATE categoria_pastel SET categoria = $1 WHERE idcatp = $2 RETURNING *",
      [categoria, idcatp]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "categoria no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//---------------------- ELIMINAR CATEGORIA --------------------------
const eliminarcategoria = async (req, res, next) => {
  const { idcatp } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM categoria_pastel WHERE idcatp = $1",
      [idcatp]
    );

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "categoria no encontrado",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllcategoria,
  getcategoria,
  crearcategoria,
  actualizarcategoria,
  eliminarcategoria,
};
