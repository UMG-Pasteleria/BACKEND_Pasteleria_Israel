const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS USUARIOS --------------------------------------
const getAllcategoria = async (req, res, next) => {
  try {
    const allcategoria = await pool.query("SELECT *FROM categoria");
    res.json(allcategoria.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO USUARIO ----------------------------------------
const getcategoria = async (req, res, next) => {
  try {
    const { id_categoria } = req.params;
    const result = await pool.query("SELECT *FROM categoria WHERE id_categoria = $1", [
      id_categoria,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "categoria no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO USUARIO ------------------
const crearcategoria = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { nom_categoria, nom_pastel} = req.body;
    const result = await pool.query(
      "INSERT INTO categoria ( nom_categoria, nom_pastel) VALUES ($1, $2 ) RETURNING *",
      //INSERT INTO usuario(iduser, nombre, apellido, telefono, email, contrasenia) VALUES (2,'juan', 'Mecanico', 3215792, 'juan@mecanico.com', 'juan123')
      [ nom_categoria, nom_pastel]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE USUARIO -----------------------------------------
const actualizarcategoria = async (req, res, next) => {
  const { id_categoria } = req.params;
 try{
    const { nom_categoria, nom_pastel } = req.body;

    const result = await pool.query(
      "UPDATE categoria SET nom_categoria = $1, nom_pastel = $2 WHERE id_categoria = $3 RETURNING *",
      [nom_categoria, nom_pastel, id_categoria]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "categoria no encontrado",
      });
    res.json(result.rows[0]);
 }
 catch(error){
    next(error);
 }
};

//---------------------- ELIMINAR USUARIO --------------------------
const eliminarcategoria = async (req, res) => {
  const { idusuario } = req.params;
  try{
    const result = await pool.query("DELETE FROM categoria WHERE id_categoria = $1", [
        idusuario,
      ]);
    
      if (result.rowCount === 0)
        return res.status(404).json({
          message: "categoria no encontrado",
        });
    
      return res.sendStatus(204);
  }catch(error){
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
