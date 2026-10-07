import {
  handleAddToCartBtnClick,
  handleAddToWishBtnClick,
  handleCategoryClick,
  handleClearSearchBtn,
  handleLoadMoreButtonClick,
  handleProductClick,
  handleScrollTop,
  handleScrollTopBtnClick,
  handleSearchSubmit,
  handleThemeToggleBtnClick,
  initHomePage,
} from './js/handlers';
import { showTost } from './js/helpers';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', initHomePage);

refs.categoriesList.addEventListener('click', handleCategoryClick);

refs.productsList.addEventListener('click', handleProductClick);

refs.searchForm.addEventListener('submit', handleSearchSubmit);

refs.clearSearchBtn.addEventListener('click', handleClearSearchBtn);

refs.addToWishListBtn.addEventListener('click', handleAddToWishBtnClick);

refs.addToCartBtn.addEventListener('click', handleAddToCartBtnClick);

refs.loadMoreBtn.addEventListener('click', handleLoadMoreButtonClick);

window.addEventListener('scroll', handleScrollTop);

refs.scrollTopBtn.addEventListener('click', handleScrollTopBtnClick);

refs.themeToggleBtn.addEventListener('click', handleThemeToggleBtnClick);
