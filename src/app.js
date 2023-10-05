import data from './mock/data.js';
import { getProduct, addProduct, deletedItem, getStorage} from './js/products.js'
import { showCart } from './js/showCart.js';


// Modal carrito
const cartModal = document.querySelector('.cart__modal');
const cartUl = document.querySelector('.card__content');

// Carrito de compras
const contentProducts = document.querySelector('.main__content-grid');
const cartBody = document.querySelector('.cart__body');
const iconCart = document.querySelector('#icon-cart')
const closeCart = document.querySelector('.close');



listener();
function listener() {
    iconCart.addEventListener('click',()=> showCart(cartUl,cartModal))
    closeCart.addEventListener('click',  ()=> showCart(cartUl,cartModal));

    document.addEventListener('DOMContentLoaded', ()=> getProduct(data, contentProducts));
    contentProducts.addEventListener('click', (e)=> addProduct(e, cartBody, cartUl, cartModal));
    cartBody.addEventListener('click', (e)=> deletedItem(e, cartBody))
    document.addEventListener('DOMContentLoaded', ()=> getStorage(cartBody));
}