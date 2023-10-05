// Menu desplegable en  mobile

 export function showMenu(menu,modal) {
    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        modal.classList.remove('isActive')
        
    } else {
        menu.classList.add('active');
        modal.classList.add('isActive')
    }
}
