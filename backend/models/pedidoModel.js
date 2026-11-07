// models/pedidoModel.js
const db = require('../config/database');

async function registrarPedido(nombre, email, producto, cantidad, tamano, paraLlevar, observ) {
    const sql = `INSERT INTO pedidos
        (nombre_cliente, correo_cliente, producto, cantidad, tamano, para_llevar, observaciones, fecha_registro)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;

    const [resultado] = await db.execute(sql, [
        nombre,
        email,
        producto,
        cantidad,
        tamano,
        paraLlevar ? 1 : 0,
        observ
    ]);

    return resultado.insertId;
}

module.exports = { registrarPedido };