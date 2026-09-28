import { toggleAcctiveClass } from './helpers';
import {
  getCategoires,
  getProducts,
  getProductsByCategory,
} from './products-api';
import {
  clearProductsList,
  renderCategories,
  renderProducts,
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

    console.log(productsData);
    renderProducts(productsData.products);
  } catch (err) {
    console.log(`Помилка отримання продуктів по категорії ${err}`);
  }
}
