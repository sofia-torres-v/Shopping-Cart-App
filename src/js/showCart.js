export function showCart(cartUl, cartModal) {
    if (cartUl.classList.contains('active')) {
        cartUl.classList.remove('active');
        cartModal.classList.remove('isActive')
        
    } else {
        cartUl.classList.add('active');
        cartModal.classList.add('isActive')
    }
}