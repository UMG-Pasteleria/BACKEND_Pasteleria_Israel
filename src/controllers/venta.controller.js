const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'pasteleria_israel', 
});

// Controlador para crear una nueva venta
const crearVenta = async (req, res) => {
    const { clienteId, productoId, cantidad, precioTotal } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO ventas (cliente_id, producto_id, cantidad, precio_total) VALUES ($1, $2, $3, $4) RETURNING *',
            [clienteId, productoId, cantidad, precioTotal]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear una nueva venta');
    }
};

// Controlador para obtener todas las ventas
const obtenerVentas = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ventas');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las ventas');
    }
};

// Controlador para obtener una venta por su ID
const obtenerVentaPorId = async (req, res) => {
    const ventaId = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM ventas WHERE id = $1', [ventaId]);
        if (result.rows.length === 0) {
            res.status(404).send('Venta no encontrada');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la venta');
    }
};

// Controlador para actualizar una venta por su ID
const actualizarVenta = async (req, res) => {
    const ventaId = req.params.id;
    const { clienteId, productoId, cantidad, precioTotal } = req.body;
    try {
        const result = await pool.query(
            'UPDATE ventas SET cliente_id = $1, producto_id = $2, cantidad = $3, precio_total = $4 WHERE id = $5 RETURNING *',
            [clienteId, productoId, cantidad, precioTotal, ventaId]
        );
        if (result.rows.length === 0) {
            res.status(404).send('Venta no encontrada');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la venta');
    }
};

// Controlador para eliminar una venta por su ID
const eliminarVenta = async (req, res) => {
    const ventaId = req.params.id;
    try {
        const result = await pool.query('DELETE FROM ventas WHERE id = $1 RETURNING *', [ventaId]);
        if (result.rows.length === 0) {
            res.status(404).send('Venta no encontrada');
        } else {
            res.json({ message: 'Venta eliminada exitosamente' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la venta');
    }
};

module.exports = {
    crearVenta,
    obtenerVentas,
    obtenerVentaPorId,
    actualizarVenta,
    eliminarVenta,
};
