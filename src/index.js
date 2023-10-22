const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

app = express();

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
const webRouter = require("./routes/web.routes");
const categoriaRouter = require("./routes/categoria.routes");
const paginawebRouter = require("./routes/pagweb.routes");
const mate_primaRouter = require("./routes/mate_prima.routes");

app.use(pagoRouter);
app.use(facturaRouter);
app.use(ventaRouter);
app.use(pedidosRouter);
app.use(webRouter);
app.use(categoriaRouter);
app.use(paginawebRouter);
app.use(mate_primaRouter);
app.use(productoRouter);
app.use(tipoclienteRouter);
app.use(clientesRouter);
app.use(comprasRouter);
app.use(proveedoresRouter);
app.use(usuariosRouter);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.listen(3000);
console.log("Server on port 3000");
