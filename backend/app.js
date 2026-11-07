//Archivo servidor
const express = require('express');
const path = require('path')
require('dotenv').config();
const pedidosRoutes = require('./routes/pedidoRoutes');

const app = express(); //Aplicación o servidor

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

app.use(pedidosRoutes);

app.listen(3000, () =>
{
    console.log('Servidor ejecutandose en el puerto 3000');
});