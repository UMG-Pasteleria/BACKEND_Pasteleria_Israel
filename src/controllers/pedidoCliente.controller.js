const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'pasteleria_israel', // Reemplaza con la conexión a tu base de datos
});

// Controlador para crear un nuevo pedido
const crearPedido = async (req, res) => {
    const { clienteId, productos, total } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO pedidos (cliente_id, productos, total) VALUES ($1, $2, $3) RETURNING *',
            [clienteId, productos, total]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear un nuevo pedido');
    }
};

// Controlador para obtener todos los pedidos
const obtenerPedidos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pedidos');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los pedidos');
    }
};

// Controlador para obtener un pedido por su ID
const obtenerPedidoPorId = async (req, res) => {
    const pedidoId = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM pedidos WHERE id = $1', [pedidoId]);
        if (result.rows.length === 0) {
            res.status(404).send('Pedido no encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el pedido');
    }
};

// Controlador para actualizar un pedido por su ID
const actualizarPedido = async (req, res) => {
    const pedidoId = req.params.id;
    const { clienteId, productos, total } = req.body;
    try {
        const result = await pool.query(
            'UPDATE pedidos SET cliente_id = $1, productos = $2, total = $3 WHERE id = $4 RETURNING *',
            [clienteId, productos, total, pedidoId]
        );
        if (result.rows.length === 0) {
            res.status(404).send('Pedido no encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el pedido');
    }
};

// Controlador para eliminar un pedido por su ID
const eliminarPedido = async (req, res) => {
    const pedidoId = req.params.id;
    try {
        const result = await pool.query('DELETE FROM pedidos WHERE id = $1 RETURNING *', [pedidoId]);
        if (result.rows.length === 0) {
            res.status(404).send('Pedido no encontrado');
        } else {
            res.json({ message: 'Pedido eliminado exitosamente' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el pedido');
    }
};

module.exports = {
    crearPedido,
    obtenerPedidos,
    obtenerPedidoPorId,
    actualizarPedido,
    eliminarPedido,
};
