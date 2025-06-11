export function saveToFavorites(productId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(productId)) {
    favorites.push(productId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Saved!");
  }
}

export function loadFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}
