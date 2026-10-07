import {
  handleAddToCartBtnClick,
  handleAddToWishBtnClick,
  handleProductClick,
  handleScrollTop,
  handleScrollTopBtnClick,
  handleThemeToggleBtnClick,
  initWhishlistPage,
} from './js/handlers';
import { loadWishlistProducts } from './js/helpers';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', initWhishlistPage);

refs.productsList.addEventListener('click', handleProductClick);

refs.addToWishListBtn.addEventListener('click', async () => {
  handleAddToWishBtnClick();
  await loadWishlistProducts();
});

refs.addToCartBtn.addEventListener('click', () => {
  handleAddToCartBtnClick();
});

window.addEventListener('scroll', handleScrollTop);

refs.scrollTopBtn.addEventListener('click', handleScrollTopBtnClick);

refs.themeToggleBtn.addEventListener('click', handleThemeToggleBtnClick);
