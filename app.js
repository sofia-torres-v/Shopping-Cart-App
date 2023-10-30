import {
    showApi,
    addProduct,
    deletedItem,
    getStorage,
    increaseItem, 
    decreaseItem,
    clearCart,
    searchByName
} from './js/products.js'

import {
    showCart,
    showMenu,
    showSearch
} from './js/showModal.js';

const contentProducts = document.querySelector('.main__content-grid');

const buttonMenu = document.querySelector('#header__icon');
const menu = document.querySelector('.header__enlaces');
const modalMenu = document.querySelector('.modal');
const closeMenu = document.querySelector('.modal__icon-delete');

const iconCart = document.querySelector('#icon-cart');
const cartItemCount = document.querySelector("#cart__item-count");
const cartModal = document.querySelector('.cart__modal');
const cartUl = document.querySelector('.card__content');
const closeCart = document.querySelector('.close');

const searchIcon = document.querySelector("#search-icon");
const searchModal = document.querySelector(".modal__search");
const searchModalBox = document.querySelector(".modal__search-box");
const searchInput= document.querySelector("#search-input");
const searchContent = document.querySelector('.modal__content-filter');
const closeSearch = document.querySelector(".search__icon-delete");

const cartBody = document.querySelector('.cart__body');
const headerIcons = document.querySelector('.header__content2');
const clearBtn = document.querySelector('.cart__button');
const totalDiv = document.querySelector('#cart-total');


function listener() {
    buttonMenu.addEventListener('click', ()=>showMenu(menu, modalMenu, headerIcons));
    closeMenu.addEventListener('click', ()=>showMenu(menu, modalMenu, headerIcons));

    searchIcon.addEventListener('click', ()=>showSearch(searchModal, searchModalBox));
    searchInput.addEventListener('keyup', () => {
        const searchValue = searchInput.value.trim();
        searchByName(searchValue,searchContent);    
    });

    closeSearch.addEventListener('click', ()=>showSearch(searchModal, searchModalBox));

    document.addEventListener('DOMContentLoaded', ()=> {
        showApi(contentProducts);
        clearBtn.classList.add('active');
    });

    iconCart.addEventListener('click',()=> showCart(cartUl,cartModal));
    closeCart.addEventListener('click',  ()=> showCart(cartUl,cartModal));

    contentProducts.addEventListener('click', (e)=> addProduct(e, cartBody, cartUl, cartModal, totalDiv, clearBtn, cartItemCount));
    cartBody.addEventListener('click', (e)=> deletedItem(e, cartBody, totalDiv, clearBtn, cartItemCount));

    document.addEventListener('DOMContentLoaded', ()=> getStorage(cartBody,totalDiv, cartItemCount));

    cartBody.addEventListener('click', (e)=>increaseItem(e, totalDiv, cartItemCount));
    cartBody.addEventListener('click', (e)=>decreaseItem(e, totalDiv, cartItemCount));

    clearBtn.addEventListener('click', ()=>clearCart(cartBody,totalDiv, clearBtn, cartItemCount));
    searchContent.addEventListener('click', (e)=> addProduct(e, cartBody, cartUl, cartModal, totalDiv, clearBtn, cartItemCount));
}
listener();