const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const usuariosRouter = require('./routes/usuarios.routes')
const proveedoresRouter = require('./routes/proveedores.routes')
const comprasRouter = require('./routes/compras.routes')
const clientesRouter = require('./routes/clientes.routes')
const tipoclienteRouter = require('./routes/tipocliente.routes')
const productoRouter = require('./routes/productos.routes')
const pagoRouter = require('./routes/modo_pago.rou')
const facturaRouter = require('./routes/factura.rou')
const ventaRouter = require('./routes/ventas.rou')

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(usuariosRouter);
app.use(proveedoresRouter);
app.use(comprasRouter);
app.use(clientesRouter);
app.use(tipoclienteRouter);
app.use(productoRouter);
app.use(pagoRouter);
app.use(facturaRouter);
app.use(ventaRouter);


app.use((err, req, res, next) =>{
    return res.json({
        message: err.message
    })
}) 

app.listen(3000)
console.log('Server on port 3000');