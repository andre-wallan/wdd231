import { saveToFavorites, loadFavorites } from './storage.js';

const productsContainer = document.querySelector("#products");

async function fetchProducts() {
  try {
    const res = await fetch("data/products.json");
    const data = await res.json();
    displayProducts(data);
  } catch (err) {
    productsContainer.innerHTML = "<p>Error loading products.</p>";
  }
}

function displayProducts(products) {
  products.forEach(product => {
    const card = document.createElement("div");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Rating: ${product.rating}</p>
      <button data-id="${product.id}">Details</button>
    `;
    card.querySelector("button").addEventListener("click", () => openModal(product));
    productsContainer.appendChild(card);
  });
}

function openModal(product) {
  const modal = document.getElementById("product-modal");
  modal.querySelector(".modal-content").innerHTML = `
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <button onclick="saveToFavorites(${product.id})">Save</button>
    <button onclick="closeModal()">Close</button>
  `;
  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("product-modal").style.display = "none";
}

fetchProducts();
