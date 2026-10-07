import { STORAGE_KEYS } from './constants';
export function getFromStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error(`Error reading from LocalStorage ${err.message}`);
    return null;
  }
}

export function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error save to LocalStorage ${err.message}`);
  }
}

export function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}

export function getWishlistItems() {
  return getFromStorage(STORAGE_KEYS.WISHLIST) || [];
}

export function getCartItems() {
  return getFromStorage(STORAGE_KEYS.CART) || [];
}

export function addToWishlist(id) {
  const items = getWishlistItems();
  if (!items.includes(id)) {
    items.push(id);
    saveToStorage(STORAGE_KEYS.WISHLIST, items);
  }
}

export function addToCart(id) {
  const items = getCartItems();
  if (!items.includes(id)) {
    items.push(id);
    saveToStorage(STORAGE_KEYS.CART, items);
  }
}

export function isInWishlist(id) {
  return getWishlistItems().includes(id);
}

export function isInCart(id) {
  return getCartItems().includes(id);
}

export function removeFromWishlist(id) {
  const items = getWishlistItems();
  const updatedList = items.filter(item => item !== id);
  saveToStorage(STORAGE_KEYS.WISHLIST, updatedList);
}

export function removeFromCart(id) {
  const items = getCartItems();
  const updatedList = items.filter(item => item !== id);
  saveToStorage(STORAGE_KEYS.CART, updatedList);
}

export function getTheme() {
  return getFromStorage(STORAGE_KEYS.THEME) || 'light';
}

export function saveTheme(theme) {
  saveToStorage(STORAGE_KEYS.THEME, theme);
}
