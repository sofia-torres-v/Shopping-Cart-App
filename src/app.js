import data from './mock/data.js';
import { getProduct, addProduct, deletedItem, getStorage, increaseItem,  decreaseItem, clearCart} from './js/products.js'
import { showCart, showMenu, showSearch } from './js/showModal.js';


const contentProducts = document.querySelector('.main__content-grid');

const buttonMenu = document.querySelector('#header__icon');
const menu = document.querySelector('.header__enlaces');
const modalMenu = document.querySelector('.modal');
const closeMenu = document.querySelector('.modal__icon-delete');

const iconCart = document.querySelector('#icon-cart')
const cartModal = document.querySelector('.cart__modal');
const cartUl = document.querySelector('.card__content');
const closeCart = document.querySelector('.close');

const cartBody = document.querySelector('.cart__body');
const headerIcons = document.querySelector('.header__content2');
const clearBtn = document.querySelector('.cart__button');
const totalDiv = document.querySelector('#cart-total');

const searchIcon = document.querySelector("#search-icon");
const searchModal = document.querySelector(".modal__search");
const searchModalBox = document.querySelector(".modal__search-box");
const closeSearch = document.querySelector(".search__icon-delete");




// Función principal para escuchar eventos.
listener();
function listener() {
    buttonMenu.addEventListener('click', ()=>showMenu(menu, modalMenu, headerIcons));
    closeMenu.addEventListener('click', ()=>showMenu(menu, modalMenu, headerIcons));

    searchIcon.addEventListener('click', ()=>showSearch(searchModal, searchModalBox));
    closeSearch.addEventListener('click', ()=>showSearch(searchModal, searchModalBox));



    document.addEventListener('DOMContentLoaded', ()=> {
        getProduct(data, contentProducts);
        clearBtn.classList.add('active');
        // clearBtn.disabled = true;
    });

    iconCart.addEventListener('click',()=> showCart(cartUl,cartModal));
    closeCart.addEventListener('click',  ()=> showCart(cartUl,cartModal));

    contentProducts.addEventListener('click', (e)=> addProduct(e, cartBody, cartUl, cartModal, totalDiv, clearBtn));
    cartBody.addEventListener('click', (e)=> deletedItem(e, cartBody, totalDiv, clearBtn));

    document.addEventListener('DOMContentLoaded', ()=> getStorage(cartBody,totalDiv));

    cartBody.addEventListener('click', (e)=>increaseItem(e, totalDiv));
    cartBody.addEventListener('click', (e)=>decreaseItem(e, totalDiv));

    clearBtn.addEventListener('click', ()=>clearCart(cartBody,totalDiv, clearBtn));



}