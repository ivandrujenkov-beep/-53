let cart = JSON.parse(localStorage.getItem('toolCart')) || [];

function updateCartCount() {
  const count = cart.length;
  const cartLinks = document.querySelectorAll('a[href="cart.html"]');
  cartLinks.forEach(link => {
    if (link.innerText.includes("Корзина")) {
      link.innerText = `Корзина (${count})`;
    }
  });
}

function isInCart(id) {
  return cart.some(item => item.id === id);
}

function addToCart(tool) {
  if (isInCart(tool.id)) return;
  cart.push(tool);
  localStorage.setItem('toolCart', JSON.stringify(cart));
  updateCartCount();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('toolCart', JSON.stringify(cart));
  updateCartCount();
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  const buttons = document.querySelectorAll('button[data-id]');
  buttons.forEach(button => {
    const id = button.getAttribute('data-id');

    function setState() {
      if (isInCart(id)) {
        button.innerText = 'Добавлено';
        button.style.backgroundColor = '#4CAF50';
      } else {
        button.innerText = 'Забронировать';
        button.style.backgroundColor = '#FFD700';
      }
    }

    setState();

    button.addEventListener('click', () => {
      const card = button.closest('.tool-card');
      const name = card.querySelector('h3').innerText;
      const model = card.querySelector('.subtitle').innerText;
      const priceText = card.querySelector('.price').innerText;
      const price = parseInt(priceText.replace(/\D/g, ''));
      const image = card.querySelector('img').src;

      if (isInCart(id)) {
        removeFromCart(id);
      } else {
        addToCart({ id, name, model, price, image, days: 1 });
      }

      setState();
    });
  });
});