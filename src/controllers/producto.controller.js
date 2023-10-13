const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'pasteleria_israel', 
});

// Controlador para obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
        const productos = await db.query('SELECT * FROM producto');
        res.json(productos.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
    }
};

// Controlador para crear un nuevo producto
const crearProducto = async (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;
    try {
        const nuevoProducto = await db.query(
            'INSERT INTO producto (nombre, descripcion, precio, stock) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, descripcion, precio, stock]
        );
        res.json(nuevoProducto.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear un nuevo producto');
    }
};

// Controlador para obtener un producto por su ID
const obtenerProductoPorId = async (req, res) => {
    const productId = req.params.id;
    try {
        const producto = await db.query('SELECT * FROM producto WHERE id = $1', [productId]);
        if (producto.rows.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(producto.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el producto');
    }
};

// Controlador para actualizar un producto por su ID
const actualizarProducto = async (req, res) => {
    const productId = req.params.id;
    const { nombre, descripcion, precio, stock } = req.body;
    try {
        const productoActualizado = await db.query(
            'UPDATE producto SET nombre = $1, descripcion = $2, precio = $3, stock = $4 WHERE id = $5 RETURNING *',
            [nombre, descripcion, precio, stock, productId]
        );
        if (productoActualizado.rows.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(productoActualizado.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el producto');
    }
};

// Controlador para eliminar un producto por su ID
const eliminarProducto = async (req, res) => {
    const productId = req.params.id;
    try {
        const productoEliminado = await db.query('DELETE FROM producto WHERE id = $1 RETURNING *', [productId]);
        if (productoEliminado.rows.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json({ message: 'Producto eliminado exitosamente' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el producto');
    }
};

module.exports = {
    obtenerProductos,
    crearProducto,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto,
};
