export const refs = {
  categoriesList: document.querySelector('.categories'),
  productsList: document.querySelector('.products'),
  notFound: document.querySelector('.not-found'),

  modal: document.querySelector('.modal'),
  modalCloseBtn: document.querySelector('.modal__close-btn'),
  modalProduct: document.querySelector('.modal-product'),

  searchForm: document.querySelector('.search-form'),
  clearSearchBtn: document.querySelector('.search-form__btn-clear'),

  addToWishListBtn: document.querySelector('.modal-product__btn--wishlist'),
  addToCartBtn: document.querySelector('.modal-product__btn--cart'),

  whishlistCount: document.querySelector('[data-wishlist-count]'),
  cartCount: document.querySelector('[data-cart-count]'),

  loadMoreBtn: document.querySelector('.load-more-btn'),

  cartSummaryValue: document.querySelector('[data-count]'),
  cartPrice: document.querySelector('[data-price]'),
  //buyProductsBtn: document.querySelector(''),
  scrollTopBtn: document.querySelector('.scroll-top-btn'),

  themeToggleBtn: document.querySelector('.theme-toggle-btn'),
};
