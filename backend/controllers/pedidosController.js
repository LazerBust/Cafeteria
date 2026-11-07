const pedidoModel = require('../models/pedidoModel');

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function registrarPedido(req, res) {
    try {
        const { nom_c, corr_e, producto, cantidad, para_llevar, observaciones, tamano } = req.body ?? {};

        const cliente = typeof nom_c === 'string' ? nom_c.trim() : '';
        const email = typeof corr_e === 'string' ? corr_e.trim().toLowerCase() : '';
        const product = typeof producto === 'string' ? producto.trim() : '';
        const cant = Number(cantidad);
        const size = typeof tamano === 'string' ? tamano.trim() : '';
        const paraLlevar = para_llevar === 'on' || para_llevar === 'true' || para_llevar === true;
        const comentarios = typeof observaciones === 'string' ? observaciones.trim() : '';

        // 400: datos faltantes o inválidos
        if (!cliente) {
            return res.status(400).send('El nombre del cliente es obligatorio');
        }

        if (!REGEX_CORREO.test(email)) {
            return res.status(400).send('El correo electrónico no es válido');
        }

        if (!product) {
            return res.status(400).send('El producto es obligatorio');
        }

        if(!size) {
            return res.status(400).send('El tamaño es obligatorio');
        }

        if (!Number.isInteger(cant) || cant < 1) {
            return res.status(400).send('La cantidad debe ser un entero mayor o igual a 1');
        }

        const id = await pedidoModel.registrarPedido(
            cliente,
            email,
            product,
            cant,
            size,
            paraLlevar,
            comentarios
        );

        // 500: el insert no devolvió id
        if (!id) {
            return res.status(500).send('No se pudo registrar el pedido');
        }

        const parametros = new URLSearchParams({
            id: String(id),
            cliente,
            email,
            producto_seleccionado: product,
            cantidad: String(cant),
            tamano: size,
            para_llevar: String(paraLlevar),
            observaciones: comentarios
        });

        return res.redirect(`/resumen.html?${parametros.toString()}`);
    }
    catch (error) {
        console.error('Error al registrar el pedido:', error);
        return res.status(500).send('Error al guardar el pedido');
    }
}

module.exports = {
    registrarPedido
};