// Responsive nav toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('hidden');
});

// Fetch and display products
document.addEventListener('DOMContentLoaded', () => {
  fetch('products.json')
    .then(res => res.json())
    .then(products => displayProducts(products));
});

function displayProducts(products) {
  const container = document.getElementById('products-container');
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
    `;
    card.addEventListener('click', () => showModal(product));
    container.appendChild(card);
  });
}

// Modal behavior
const modal = document.getElementById('product-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const modalCategory = document.getElementById('modal-category');
const modalPrice = document.getElementById('modal-price');
const closeModal = document.getElementById('modal-close');

function showModal(product) {
  modalTitle.textContent = product.name;
  modalDesc.textContent = product.description;
  modalCategory.textContent = product.category;
  modalPrice.textContent = product.price.toFixed(2);
  modal.classList.remove('hidden');
}

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});
export function applyTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

export function setupThemeToggle() {
  const toggle = document.createElement('button');
  toggle.id = 'theme-toggle';
  toggle.textContent = '🌙';
  toggle.style.position = 'fixed';
  toggle.style.bottom = '1rem';
  toggle.style.right = '1rem';
  toggle.style.zIndex = '1000';
  toggle.style.padding = '0.5rem';
  toggle.setAttribute('aria-label', 'Toggle dark/light mode');
  document.body.appendChild(toggle);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    toggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });
}
