import {
  handleAddToCartBtnClick,
  handleAddToWishListBtn,
  handleProductClick,
  handleScrollTop,
  handleScrollTopBtnClick,
  handleThemeToggleBtnClick,
  initCartPage,
  initWishlistPage,
} from './js/handlers';
import { loadCartProducts, loadWishlistProducts } from './js/helpers';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', initCartPage);

refs.productsList.addEventListener('click', handleProductClick);

refs.addToWishListBtn.addEventListener('click', handleAddToWishListBtn);

refs.addToCartBtn.addEventListener('click', async () => {
  handleAddToCartBtnClick();
  await loadCartProducts();
});

window.addEventListener('scroll', handleScrollTop);

refs.scrollTopBtn.addEventListener('click', handleScrollTopBtnClick);

refs.themeToggleBtn.addEventListener('click', handleThemeToggleBtnClick);
