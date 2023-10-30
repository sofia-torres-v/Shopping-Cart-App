import { showCart } from "./showModal.js";

let cart = [];
let appData;


export async function showApi(contentProducts) {
    try {
        const response = await fetch('./mock/data.json')
        const dataProduct = await response.json();
        getProduct(dataProduct, contentProducts) 
        appData = dataProduct;
       
    } catch (error) {
        console.log('error')
    }
}


// Mostrar productos en la interfaz.

 function getProduct(data, contentProducts) {
    data.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("main__product");
        div.innerHTML = ` <img src="${item.image}">
                            <div class="main__info">
                                <h3 class="main__info-subtitle">${item.title}</h3>
                                <p class="main__info-price"> ${item.price}</p>
                                <span class="main__info-categoria">${item.category}</span>
                                </div>
                                <button class="main__info-add" data-id='${item.id}'> Agregar</button>`;

        contentProducts.appendChild(div);
    });
}



// ----------------------------------------- Carrito de compras -------------------------------------

export function addProduct(e, cartBody, cartModal, cartUl, totalDiv, clearBtn, cartItemCount) {
    if (e.target.classList.contains("main__info-add")) {
        const item = e.target.parentElement;
        readData(item, cartBody, totalDiv, cartItemCount);
        showCart(cartModal, cartUl);
        clearBtn.classList.remove("active");
    }

}

function readData(item, cartBody, totalDiv,cartItemCount) {
    const obj = {
        image: item.querySelector("img").src,
        title: item.querySelector("h3").textContent,
        price: item.querySelector("p").textContent,
        category: item.querySelector("span").textContent,
        id: item.querySelector("button").getAttribute("data-id"),
        quantity: 1,
    };

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

    cartHtml(cart, cartBody, totalDiv, cartItemCount);
}

// Actualiza la interfaz del carrito.
function cartHtml(cart, cartBody, totalDiv, cartItemCount) {
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
    updateCartItemCount(cartItemCount);
    addLocalStorage();
}


function clearHtml(cartBody) {
    while (cartBody.firstChild) {
        cartBody.removeChild(cartBody.firstChild);
    }
}


export function deletedItem(e, cartBody, totalDiv, clearBtn, cartItemCount) {
    if (e.target.classList.contains("cart__deleted")) {
        const dataId = e.target.getAttribute("data-id");
        // Filtra el producto a eliminar .
        cart = cart.filter((item) => item.id !== dataId);
        cartHtml(cart, cartBody, totalDiv, cartItemCount);

        if (!cart.length) {
            clearBtn.classList.add("active");
        }
    }
}


export function increaseItem(e, totalDiv, cartItemCount) {
    if (e.target.classList.contains("cart__btn-plus")) {
        const ID = e.target.getAttribute("data-id");
        const itemFind = cart.find((item) => item.id === ID);

        const cartButton = e.target.parentElement;
        const inp = cartButton.querySelector("input");
        inp.value++;

        const inpUpdate = Number(inp.value);
        itemFind.quantity = inpUpdate;
  
        totalAdditionPrice(totalDiv);
        updateCartItemCount(cartItemCount);
    }

    addLocalStorage();
}


export function decreaseItem(e, totalDiv, cartItemCount) {
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
        updateCartItemCount(cartItemCount)
    }
    addLocalStorage();
}


function totalAdditionPrice(totalDiv) {
    let total = cart.reduce(
        (acc, item) => acc + Number(item.price) * item.quantity,
        0
    );
    total = Number(total.toFixed(2));
    totalDiv.textContent = total;
}


function updateCartItemCount(cartItemCount){
        const cartLength = cart.reduce((acc, item) => acc + item.quantity, 0);
        console.log(cartLength)
        cartItemCount.textContent = cartLength;
}


function addLocalStorage() {
    localStorage.setItem("itemCart", JSON.stringify(cart));
}


export function getStorage(cartBody, totalDiv, cartItemCount) {
    cart = JSON.parse(localStorage.getItem("itemCart")) || [];
    cartHtml(cart, cartBody, totalDiv, cartItemCount);
    updateCartItemCount(cartItemCount);
}


// Modal SweetAlert2
export function clearCart(cartBody, totalDiv, clearBtn, cartItemCount) {
    if (cart.length) {
        swal.fire({
            title: "¿Deseas eliminar todos tus productos?",
            icon: "question",
            showCancelButton: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Vaciar",
        }).then((result) => {
            if (result.isConfirmed) {
                cart = [];
                cartHtml(cart, cartBody, totalDiv,cartItemCount);
                swal.fire({
                    title: "Carrito vacío",
                    icon: "success",
                });
                clearBtn.classList.add("active");
                updateCartItemCount(cartItemCount);
            }
        });
    }
}



// --------------------------------------- Filtrar en input buscador -------------------------------

export function searchByName(searchValue, searchContent) {
    let filteredData = [];

    if (searchValue.trim() !== "") {
        filteredData = appData.filter((item) => {
            return item.name.toLowerCase().includes(searchValue.toLowerCase());
        });
    }

    htmlSearchModal(filteredData, searchContent);
}


function htmlSearchModal(filteredData,searchContent) {
    clearHtml(searchContent)
    filteredData.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("main__product");
        div.innerHTML = ` <img src="${item.image}">
                            <div class="main__info">
                                <h3 class="main__info-subtitle">${item.title}</h3>
                                <p class="main__info-price"> ${item.price}</p>
                                <span class="main__info-categoria">${item.category}</span>
                                </div>
                                <button class="main__info-add" data-id='${item.id}'> Agregar</button>`;

         searchContent.appendChild(div);
    }); 
}
  