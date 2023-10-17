// import Swiper from 'swiper/swiper-bundle';
import { showCart } from "./showModal.js";
let cart = [];

// Mostar productos en la interfaz.
export function getProduct(data, contentProducts) {
    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('main__product');
        div.innerHTML = ` <img src="${item.image}">
                            <div class="main__info">
                                <h3 class="main__info-subtitle">${item.title}</h3>
                                <p class="main__info-price"> ${item.price}</p>
                                <span class="main__info-categoria">${item.category}</span>
                            </div>
                            <button class="main__info-add" data-id='${item.id}'> Add</button>`

        contentProducts.appendChild(div);
    });    
}

// Adición de productos al carrito.
export function addProduct(e, cartBody, cartModal, cartUl, totalDiv,clearBtn) {
    if (e.target.classList.contains("main__info-add")) {
        const item = e.target.parentElement;
        readData(item, cartBody, totalDiv);
        showCart(cartModal, cartUl);
        clearBtn.classList.remove('active')
    }
}

// Leer información del producto y agregar al carrito.
function readData(item, cartBody, totalDiv) {
    const obj = {
        image: item.querySelector("img").src,
        title: item.querySelector("h3").textContent,
        price: item.querySelector("p").textContent,
        category: item.querySelector("span").textContent,
        id: item.querySelector("button").getAttribute("data-id"),
        quantity: 1,
    };

    // Verificar que no se  dupliquen productos con el mismo id
    const repeatedProduct = cart.some((item) => item.id === obj.id);

    if (repeatedProduct) {
        const newResul = cart.map((item) => {
            if (item.id === obj.id) {
                item.quantity++;
                return item;
            } else {
                return item;
            }
        });
        cart = [...newResul];
    } else {
        cart = [...cart, obj];
    }

    cartHtml(cart, cartBody, totalDiv);
}

// Actualiza la interfaz del carrito.
function cartHtml(cart, cartBody, totalDiv) {
    clearHtml(cartBody);
    cart.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("cart__item");
        div.innerHTML = `
        <img class="cart__column-img" src="${item.image}" alt="">
                                <div class="cart__column-info" >
                                    <div class="cart__description" >
                                        <div class='cart__description-title'>
                                            <h3>${item.title}</h3>
                                            <div class= 'cart__deleted-box'>
                                            <i class='bx bx-trash bx-md cart__deleted'data-id="${item.id}"></i>
                                            </div>
                                        </div>

                                        <div class="cart__content-details2" >
                                            <p>Precio</p>
                                            <p>${item.price}</p>
                                        </div> 

                                    </div>      

                                    <div class="cart__content-details" >
                                        <p>Cantidad</p>
                                        <div class="cart__gropu-btn" >
                                            <button data-id="${item.id}" class="cart__btn-minus" >-</button>
                                            <input class="cart__btn-inp" type="text" value='${item.quantity}'>
                                            <button data-id="${item.id}" class="cart__btn-plus" >+</button>
                                        </div>
                                    </div>  

                                </div>`;
        cartBody.appendChild(div);
    });
    totalAdditionPrice(totalDiv);
    addLocalStorage();
}

// Limpiar el contenido actual del carrito.
function clearHtml(cartBody) {
    while (cartBody.firstChild) {
        cartBody.removeChild(cartBody.firstChild);
    }
}

export function deletedItem(e, cartBody, totalDiv,clearBtn) {
    if (e.target.classList.contains("cart__deleted")) {
        const dataId = e.target.getAttribute("data-id");
        // Filtra el producto a eliminar .
        cart = cart.filter((item) => item.id !== dataId);
        cartHtml(cart, cartBody,totalDiv);

        if (!cart.length) {
            clearBtn.classList.add('active')
        }
    }
}

function addLocalStorage() {
    localStorage.setItem("itemCart", JSON.stringify(cart));
}

// Obtener datos del localStorage o un array vacío si no hay datos.
export function getStorage(cartBody,totalDiv) {
    cart = JSON.parse(localStorage.getItem("itemCart")) || [];
    cartHtml(cart, cartBody,totalDiv);
}

export function increaseItem(e, totalDiv) {
    if (e.target.classList.contains("cart__btn-plus")) {
        const ID = e.target.getAttribute("data-id");
        const itemFind = cart.find((item) => item.id === ID);

        const cartButton = e.target.parentElement;
        const inp = cartButton.querySelector("input");
        inp.value++;

        const inpUpdate = Number(inp.value);
        itemFind.quantity = inpUpdate;
         // Total del carrito
         totalAdditionPrice(totalDiv);
    }

}

export function decreaseItem(e, totalDiv) {
    if (e.target.classList.contains("cart__btn-minus")) {
        const ID = e.target.getAttribute("data-id");
        const itemFind = cart.find((item) => item.id === ID);

        const cartButton = e.target.parentElement;
        const inp = cartButton.querySelector("input");
        if (inp.value > 1) {
            inp.value--;
        }
        const inpUpdate = Number(inp.value);
        itemFind.quantity = inpUpdate;
        totalAdditionPrice(totalDiv);
    }
}

export function clearCart(cartBody, totalDiv, clearBtn) {
    if (cart.length) {
        swal.fire({
            title: "¿Deseas eliminar todos tus productos?",
            icon: "question",
            showCancelButton: "Cancelar",
            confirmButtonText: "Vaciar",
        }).then((result) => {
            if (result.isConfirmed) {
                cart = [];
                cartHtml(cart, cartBody, totalDiv, );
                swal.fire({
                    title: "Carrito vacío",
                    icon: "success",
                });
                clearBtn.classList.add('active')
            }
        });
    }
}


// Precio total de productos
 function totalAdditionPrice(totalDiv) {
    let total = cart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
    total = Number(total.toFixed(2))
    totalDiv.textContent = total;
}
  

