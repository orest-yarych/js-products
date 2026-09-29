import { showTost, toggleAcctiveClass } from './helpers';
import { openModal } from './modal';
import {
  getCategoires,
  getProductById,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from './products-api';
import {
  clearProductsList,
  hideNotFound,
  renderCategories,
  renderProductInModal,
  renderProducts,
  showNotFound,
} from './render-function';

export async function initHomePage(event) {
  try {
    const categories = await getCategoires();
    renderCategories(categories);
    const { products } = await getProducts();
    renderProducts(products);
  } catch (error) {
    console.error(`Помилка ініціанілізації сторінки Home ${error}`);
  }
}

export async function handleCategoryClick(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  clearProductsList();
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
  const productId = productItem.dataset.id;
  const product = await getProductById(productId);
  console.log(product);
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
