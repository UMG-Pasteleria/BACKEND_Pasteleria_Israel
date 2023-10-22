const pool = require("../db");

//------------------------------------ MOSTRAR TODOS LOS USUARIOS --------------------------------------
const getAllpaweb = async (req, res, next) => {
  try {
    const allpaginaweb = await pool.query("SELECT *FROM paginaweb");
    res.json(allpaginaweb.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------- MOSTRAR UN SOLO USUARIO ----------------------------------------
const getpaweb = async (req, res, next) => {
  try {
    const { id_pagiweb } = req.params;
    const result = await pool.query("SELECT *FROM paginaweb WHERE id_pagiweb = $1", [
        id_pagiweb,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({
        message: " web no encontrado",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//---------------CREAR UN NUEVO USUARIO ------------------
const crearpaweb = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { nom_web, descripcion, usuario} = req.body;
    const result = await pool.query(
      "INSERT INTO paginaweb ( nom_web, descripcion, usuario) VALUES ($1, $2, $3 ) RETURNING *",
      //INSERT INTO usuario(iduser, nombre, apellido, telefono, email, contrasenia) VALUES (2,'juan', 'Mecanico', 3215792, 'juan@mecanico.com', 'juan123')
      [ nom_web, descripcion, usuario]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//--------------------- ACTUALIZAR DATOS DE USUARIO -----------------------------------------
const actualizarpaweb = async (req, res, next) => {
  const { id_pagiweb } = req.params;
 try{
    const { nom_web, descripcion, usuario } = req.body;

    const result = await pool.query(
      "UPDATE paginaweb SET nom_web = $1, descripcion = $2, usuario = $3 WHERE id_pagiweb = $4 RETURNING *",
      [nom_web, descripcion, usuario, id_pagiweb]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "web no encontrado",
      });
    res.json(result.rows[0]);
 }
 catch(error){
    next(error);
 }
};

//---------------------- ELIMINAR USUARIO --------------------------
const eliminarpaweb = async (req, res) => {
  const { idusuario } = req.params;
  try{
    const result = await pool.query("DELETE FROM paginaweb WHERE id_pagiweb = $1", [
        idusuario,
      ]);
    
      if (result.rowCount === 0)
        return res.status(404).json({
          message: "web no encontrado",
        });
    
      return res.sendStatus(204);
  }catch(error){
    next(error);
  }
};

module.exports = {
  getAllpaweb,
  getpaweb,
  crearpaweb,
  actualizarpaweb,
  eliminarpaweb,
};
