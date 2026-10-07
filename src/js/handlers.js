import { STORAGE_KEYS } from './constants';
import {
  loadWishlistProducts,
  showTost,
  toggleAcctiveClass,
  toggleTheme,
  updateLoadMoreButton,
} from './helpers';
import { openModal } from './modal';
import {
  getCategoires,
  getProductById,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from './products-api';
import { refs } from './refs';
import {
  clearProductsList,
  hideLoadMoreButton,
  hideNotFound,
  renderCategories,
  renderProductInModal,
  renderProducts,
  showLoadMoreButton,
  showLoadMoreButtonLoading,
  showNotFound,
  updateCartSummary,
  updateCounters,
} from './render-function';
import {
  addToCart,
  addToWishlist,
  getCartItems,
  getTheme,
  getWishlistItems,
  isInCart,
  isInWishlist,
  removeFromCart,
  removeFromWishlist,
  saveTheme,
} from './storage';

let currentProductId = null;
let currentPage = 1;

export async function initHomePage(event) {
  const userTheme = getTheme();
  toggleTheme(userTheme);
  try {
    updateCounters(getWishlistItems(), getCartItems());
    const categories = await getCategoires();
    renderCategories(categories);
    const { products, total } = await getProducts(currentPage);
    renderProducts(products);
    showLoadMoreButton();
    updateLoadMoreButton(total, currentPage);
  } catch (error) {
    console.error(`Помилка ініціанілізації сторінки Home ${error}`);
  }
}

export function initWhishlistPage() {
  const userTheme = getTheme();
  toggleTheme(userTheme);
  updateCounters(getWishlistItems(), getCartItems());
  loadWishlistProducts();
}

export async function handleCategoryClick(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  clearProductsList();
  hideLoadMoreButton();
  try {
    const category = event.target.textContent;
    const allCategoriesButtons = document.querySelectorAll('.categories__btn');
    toggleAcctiveClass(
      allCategoriesButtons,
      event.target,
      'categories__btn--active'
    );

    let productsData;
    if (category === 'All') {
      productsData = await getProducts();
      showLoadMoreButton();
      updateLoadMoreButton(productsData.total, currentPage);
    } else {
      productsData = await getProductsByCategory(category);
    }
    if (productsData.products.length > 0) {
      hideNotFound();
      renderProducts(productsData.products);
    } else {
      showNotFound();
    }
  } catch (err) {
    console.log(`Помилка отримання продуктів по категорії ${err}`);
  }
}

export async function handleProductClick(event) {
  const productItem = event.target.closest('.products__item');
  if (!productItem) {
    return;
  }
  const productId = Number(productItem.dataset.id);
  currentProductId = productId;
  const product = await getProductById(productId);
  renderProductInModal(product);
  openModal();
}

export async function handleSearchSubmit(event) {
  event.preventDefault();
  const query = event.currentTarget.elements.searchValue.value.trim();
  if (!query) {
    showTost('Please enter a valid search query', 'warning');
    return;
  }
  clearProductsList();
  hideLoadMoreButton();
  try {
    const { products } = await searchProducts(query);
    if (products.length > 0) {
      renderProducts(products);
      hideNotFound();
    } else {
      showNotFound();
    }
  } catch (error) {
    showTost(`Помилка отримання продуктів по пошуку ${err}`, 'error');
    console.log(`Помилка отримання продуктів по пошуку ${err}`);
  }
}

export async function handleClearSearchBtn(event) {
  refs.searchForm.reset();
  currentPage = 1;
  try {
    const { products, total } = await getProducts();
    clearProductsList();
    renderProducts(products);
    hideNotFound();
    showLoadMoreButton();
    updateLoadMoreButton(total, currentPage);
    const categoryEl = document.querySelector('.categories__btn');
    const allCategoriesButtons = document.querySelectorAll('.categories__btn');
    toggleAcctiveClass(
      allCategoriesButtons,
      categoryEl,
      'categories__btn--active'
    );
  } catch (error) {
    showTost(`error fatching products ${error}`, 'error');
    console.log('error fatching products ', error);
    showNotFound();
  }
}

export function handleAddToWishBtnClick(event) {
  if (!currentProductId) {
    return;
  }
  if (isInWishlist(currentProductId)) {
    removeFromWishlist(currentProductId);
    refs.addToWishListBtn.textContent = 'Add to Wishlist';
    showTost('Product removed from Wishlist', 'info');
  } else {
    addToWishlist(currentProductId);
    refs.addToWishListBtn.textContent = 'Remove from Wishlist';
    showTost('Product added to Wishlist', 'success');
  }
  updateCounters(getWishlistItems(), getCartItems());
}

export function handleAddToCartBtnClick(event) {
  if (!currentProductId) {
    return;
  }
  if (isInCart(currentProductId)) {
    removeFromCart(currentProductId);
    refs.addToCartBtn.textContent = 'Add to Cart';
    showTost('Product removed from Cart', 'info');
  } else {
    addToCart(currentProductId);
    refs.addToCartBtn.textContent = 'Remove from Cart';
    showTost('Product added to Cart', 'success');
  }
  updateCounters(getWishlistItems(), getCartItems());
}

export async function handleLoadMoreButtonClick() {
  currentPage += 1;
  showLoadMoreButtonLoading();
  try {
    const { products, total } = await getProducts(currentPage);
    renderProducts(products);
    updateLoadMoreButton(total, currentPage);
  } catch (error) {
    showTost(`error clicking load more button ${error}`, 'error');
    console.log('error clicking load more button ', error);
  }
}

export function handleBuyPrroductsClick() {
  const cartItems = getCartItems();
  if (cartItems.length === 0) {
    showTost('Your car is empty', 'warning');
    return;
  }

  showTost('Thank for yout purchase!', 'success');

  removeFromLocalStorage(STORAGE_KEYS.CART);

  updateCoutners(getWishlistItems(), []);

  updateCartSummary([]);

  window.location.reload();
}

export function handleScrollTop() {
  if (window.scrollY) {
    refs.scrollTopBtn.classList.add('scroll-top-btn--visible');
  } else {
    refs.scrollTopBtn.classList.remove('scroll-top-btn--visible');
  }
}

export function handleScrollTopBtnClick() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

export function handleThemeToggleBtnClick(event) {
  const currentTheme = document.body.dataset.theme || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  toggleTheme(newTheme);
  saveTheme(newTheme);
}
