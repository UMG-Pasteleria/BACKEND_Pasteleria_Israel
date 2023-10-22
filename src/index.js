const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const usuariosRouter = require("./routes/usuarios.routes");
const proveedoresRouter = require("./routes/proveedores.routes");
const comprasRouter = require("./routes/compras.routes");
const clientesRouter = require("./routes/clientes.routes");
const tipoclienteRouter = require("./routes/tipocliente.routes");
const productoRouter = require("./routes/productos.routes");
const pagoRouter = require("./routes/modo_pago.routes");
const facturaRouter = require("./routes/factura.routes");
const ventaRouter = require("./routes/ventas.routes");
const pedidosRouter = require("./routes/pedidoCliente.routes");
const categoriaRouter = require("./routes/categoria.rou");
const paginawebRouter = require("./routes/pagweb.rou");
const mate_primaRouter = require("./routes/mate_prima.rou");

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
app.use(pedidosRouter);
app.use(categoriaRouter);
app.use(paginawebRouter);
app.use(mate_primaRouter);

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.listen(3000);
console.log("Server on port 3000");
