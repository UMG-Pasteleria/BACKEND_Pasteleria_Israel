const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const usuariosRouter = require('./routes/usuarios.routes')
const proveedoresRouter = require('./routes/proveedores.routes')

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); //req. body

app.use(usuariosRouter);
app.use(proveedoresRouter);

app.use((err, req, res, next) =>{
    return res.json({
        message: err.message
    })
}) 


//ROUTES
//Register and login routes
app.use("/auth", require("./routes/jwtAuth"));
app.use("/home", require("./routes/home"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
