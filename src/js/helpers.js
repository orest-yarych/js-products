import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { ITEMS_PER_PAGE } from './constants';
import {
  clearProductsList,
  hideLoadMoreButton,
  hideLoadMoreButtonLoading,
  hideNotFound,
  renderProducts,
  showNotFound,
} from './render-function';
import { getWishlistItems } from './storage';
import { getProductsByIds } from './products-api';
import { refs } from './refs';

export function toggleAcctiveClass(elements, activeElement, activeClass) {
  elements.forEach(element => {
    element.classList.remove(activeClass);
  });
  activeElement.classList.add(activeClass);
}

export function showTost(message, type = 'success') {
  const options = {
    message,
    position: 'topRight',
    timeout: 5000,
  };
  switch (type) {
    case 'success':
      iziToast.success(options);
      break;
    case 'error':
      iziToast.error(options);
      break;
    case 'warning':
      iziToast.warning(options);
      break;
    case 'info':
      iziToast.info(options);
      break;
    default:
      iziToast.error({
        message: 'Invalid type of tost',
        position: 'topRight',
        timeout: 5000,
      });
  }
}

export function updateLoadMoreButton(total, currentPage) {
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  if (currentPage === totalPages) {
    hideLoadMoreButton();
    showTost('No more products', 'info');
  } else {
    hideLoadMoreButtonLoading();
  }
}

export async function loadWishlistProducts() {
  const wishlist = getWishlistItems();
  clearProductsList();

  if (wishlist.length === 0) {
    showNotFound();
    return;
  }
  hideNotFound();
  try {
    const products = await getProductsByIds(wishlist);
    renderProducts(products);
  } catch (err) {
    console.log(`Errors loading whishlist products ${err}`);
    showTost(`Errors loading whishlist products`);
    showNotFound();
  }
}

export async function loadCartProducts() {
  const wishlist = getWishlistItems();
  clearProductsList();

  if (wishlist === 0) {
    showNotFound();
    returnl;
  }
  hideNotFound();
  try {
    const products = await getProductsByIds(wishlist);
    renderProducts(products);
  } catch (err) {
    console.log(`Errors loading whishlist products ${err}`);
    showTost(`Errors loading whishlist products`);
    showNotFound();
  }
}

export function toggleTheme(theme) {
  document.body.dataset.theme = theme;
  refs.themeToggleBtn.textContent = theme === 'light' ? '☀️' : '🌙';
}
