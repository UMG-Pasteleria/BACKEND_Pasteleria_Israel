const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const usuariosRouter = require('./routes/usuarios.routes')
const proveedoresRouter = require('./routes/proveedores.routes')
const comprasRouter = require('./routes/compras.routes')
const clientesRouter = require('./routes/clientes.routes')
const tipoclienteRouter = require('./routes/tipocliente.routes')


const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(usuariosRouter);
app.use(proveedoresRouter);
app.use(comprasRouter);
app.use(clientesRouter);
app.use(tipoclienteRouter);


app.use((err, req, res, next) =>{
    return res.json({
        message: err.message
    })
}) 

app.listen(3000)
console.log('Server on port 3000');