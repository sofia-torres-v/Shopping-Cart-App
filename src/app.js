import data from './mock/data.js';
import { getProduct, addProduct, deletedItem, getStorage} from './js/products.js'
import { showCart } from './js/showCart.js';


// Seleccionamos el contenedor donde se renderizarán los productos.
const contentProducts = document.querySelector('.main__content-grid');

// Selecciona elementos relacionados con el modal del carrito de compras.
const cartModal = document.querySelector('.cart__modal');
const cartUl = document.querySelector('.card__content');

const iconCart = document.querySelector('#icon-cart')
const closeCart = document.querySelector('.close');

// Seleccionamos el contenedor del cuerpo del carrito.
const cartBody = document.querySelector('.cart__body');



// Función principal para escuchar eventos.
listener();
function listener() {
    document.addEventListener('DOMContentLoaded', ()=> getProduct(data, contentProducts));

    iconCart.addEventListener('click',()=> showCart(cartUl,cartModal))
    closeCart.addEventListener('click',  ()=> showCart(cartUl,cartModal));

    contentProducts.addEventListener('click', (e)=> addProduct(e, cartBody, cartUl, cartModal));
    cartBody.addEventListener('click', (e)=> deletedItem(e, cartBody))

    document.addEventListener('DOMContentLoaded', ()=> getStorage(cartBody));
}