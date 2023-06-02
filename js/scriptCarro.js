/* Modal */
const productoItems = document.querySelectorAll('.product-card');
const cartModal = document.querySelector('.carro-modal');
const cartModalClose = document.querySelector('.carro-modal-cerrar');
const confirButton = document.querySelector('.carro-modal-boton');

productoItems.forEach(item => {
  item.addEventListener('click', () => {
    cartModal.classList.add('show');
  });
});

cartModalClose.addEventListener('click', () => {
  cartModal.classList.remove('show');
});

confirButton.addEventListener('click', () => {
  cartModal.classList.remove('show');
});