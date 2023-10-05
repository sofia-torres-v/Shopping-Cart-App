export function showCart(cart, cartModal) {
    if (cart.classList.contains('active')) {
        cart.classList.remove('active');
        cartModal.classList.remove('isActive')
        
    } else {
        cart.classList.add('active');
        cartModal.classList.add('isActive')
    }
}