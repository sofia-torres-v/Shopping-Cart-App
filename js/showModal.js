export function showMenu(menu, modalMenu) {

    if (menu.classList.contains('isActive')) {
        menu.classList.remove('isActive');
        modalMenu.classList.remove('isActive');
        
    } else {
        menu.classList.add('isActive');
        modalMenu.classList.add('isActive')
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