const parametros = new URLSearchParams(window.location.search);

const cliente = parametros.get('cliente');
const email = parametros.get('email');
const product = parametros.get('producto_seleccionado');
const cantidad = parametros.get('cantidad');
const tamano = parametros.get('tamano');
const textoParaLlevar = parametros.get('para_llevar') === 'true' ? 'Sí' : 'No';
const observaciones = parametros.get('observaciones') || 'Sin observaciones';

document.getElementById('nom_c').textContent = cliente;
document.getElementById('corr_e').textContent = email;
document.getElementById('producto').textContent = product;
document.getElementById('cantidad').textContent = cantidad;
document.getElementById('tamano').textContent = tamano;
document.getElementById('para_llevar').textContent = textoParaLlevar;
document.getElementById('observaciones').textContent = observaciones;