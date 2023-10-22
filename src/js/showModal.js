// Función que muestra u oculta un modal correspondiente.

export function showMenu(menu, modalMenu, headerIcons) {

     if (menu.classList.contains('isActive')) {
        menu.classList.remove('isActive');
        modalMenu.classList.remove('isActive');
        // headerIcons.style.opacity = '1';
        
    } else {
        menu.classList.add('isActive');
        modalMenu.classList.add('isActive')
        // headerIcons.style.opacity = '0';
    }
}


export function showCart(cartUl, cartModal) {
    cartUl.classList.toggle('active');
    cartModal.classList.toggle('isActive');
}


export function showSearch( searchModalBox, searchModal) {
    searchModalBox.classList.toggle('isActive');
    searchModal.classList.toggle('isActive');
}