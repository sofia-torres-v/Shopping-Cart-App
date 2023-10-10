import { showCart } from "./showModal.js"


let cart = [];

// Función que muestra productos en la interfaz de usuario.
export function getProduct(data, contentProducts) {
    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('main__product');
        div.innerHTML = ` <img src="${item.image}">
                            <div class="main__info">
                                <h3 class="main__info-subtitle">${item.title}</h3>
                                <p class="main__info-price"> ${item.price}</p>
                                <p class="main__info-categoria">${item.category}</p>
                            </div>
                            <button class="main__info-add" data-id='${item.id}'> Add</button>`

        contentProducts.appendChild(div);
    });    
}

// Función que se llama al hacer clic en el botón "Add" de un producto.
export function addProduct(e, cartBody,cartModal,cartUl) {
   if (e.target.classList.contains('main__info-add')) {
    const item = e.target.parentElement;
    leerData(item, cartBody);
    showCart(cartModal, cartUl);
   }
}

// Función que lee la información del producto y lo agrega al carrito.
function leerData(item, cartBody) {
    const obj = {
        image : item.querySelector('img').src,
        title: item.querySelector('h3').textContent,
        price: item.querySelector('p').textContent,
        category: item.querySelector('p').textContent,
        id : item.querySelector('button').getAttribute('data-id'),
        quantity: 1
    } 

    const existe = cart.some(item => item.id === obj.id)

    if (existe) {
        const newResul = cart.map(item => {
            if (item.id === obj.id) {
                item.quantity++;
                return item;
            } else {
                return item;
            }
        })
        cart = [...newResul]  
    } else {
        cart = [...cart, obj]  
    }

    cartHtml(cart, cartBody);
}


// Función que actualiza la interfaz de usuario del carrito.
function cartHtml(cart, cartBody) {
    clearHtml(cartBody);
    cart.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('cart__item');
        div.innerHTML = `
        <img class="cart__column-img" src="${item.image}" alt="">
                                <div class="cart__column-info" >
                                    <div class="cart__description" >
                                        <h3>${item.title}</h3>
                                        <i class='bx bx-trash bx-md cart__deleted'data-id="${item.id}"></i>
                                    </div>
                                    <div class="cart__content-details" >
                                        <p>subtotal</p>
                                        <div class='cart__details-group'>
                                            <div class="cart__gropu-btn" >
                                                <button class="cart__btn-minus" >-</button>
                                                <input type="text" value='${item.quantity}'>
                                                <button class="cart__btn-plus" >+</button>
                                            </div>
                                            <p>${item.price}</p>
                                        </div>
                                    </div>
                                </div>`
        cartBody.appendChild(div);
    });
    addLocalStorage()
}


// Función para limpiar el contenido actual del carrito.
function clearHtml(cartBody) {
    while (cartBody.firstChild) {
        cartBody.removeChild(cartBody.firstChild)
    }
}

// Función para eliminar un producto del carrito.
export function deletedItem(e,cartBody) {
    if (e.target.classList.contains('cart__deleted')) {
        const dataId = e.target.getAttribute('data-id')
        // Filtra el producto a eliminar .
        cart = cart.filter(item => item.id !== dataId)
        cartHtml(cart, cartBody)
    }
}

// Función para almacenar los datos del carrito en el localStorage.
function addLocalStorage() {
    localStorage.setItem('itemCart', JSON.stringify(cart))
}

// Función para obtener los datos almacenados en el localStorage o un array vacío si no hay datos.
export function getStorage(cartBody) {
    cart = JSON.parse(localStorage.getItem('itemCart')) || [];  
    cartHtml(cart, cartBody)
}