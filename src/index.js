const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const usuariosRouter = require('./routes/usuarios.routes');
const proveedoresRouter = require('./routes/proveedores.routes');
const pedidosRouter = require('./routes/pedidosCliente.routes'); // Ruta de pedidos de clientes
const productosRouter = require('./routes/producto.routes'); // Ruta de productos
const ventasRouter = require('./routes/venta.routes'); // Ruta de ventas

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(usuariosRouter);
app.use(proveedoresRouter);

// Agregar las rutas de pedidos de clientes, productos y ventas
app.use(pedidosRouter);
app.use(productosRouter);
app.use(ventasRouter);

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    });
});

app.listen(3000);
console.log('Server on port 3000');
