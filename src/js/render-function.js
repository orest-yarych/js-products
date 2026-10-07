import { refs } from './refs';
import { isInCart, isInWishlist } from './storage';

export function renderCategories(categories) {
  const categoriesAll = ['All', ...categories];
  const markup = categoriesAll
    .map(
      category => `<li class="categories__item">
  <button class="categories__btn" type="button">${category}</button>
</li>
`
    )
    .join('');

  refs.categoriesList.innerHTML = markup;
  const firstCategories = document.querySelector('.categories__btn');
  firstCategories.classList.add('categories__btn--active');
}

export function renderProducts(products) {
  const markup = products
    .map(
      ({
        id,
        thumbnail,
        title,
        category,
        brand,
        price,
      }) => `<li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${brand}</span></p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: ${price}$</p>
 </li>`
    )
    .join('');
  refs.productsList.insertAdjacentHTML('beforeend', markup);
}

export function clearProductsList() {
  refs.productsList.innerHTML = '';
}

export function showNotFound() {
  refs.notFound.classList.add('not-found--visible');
}

export function hideNotFound() {
  refs.notFound.classList.remove('not-found--visible');
}

export function renderProductInModal({
  id,
  images,
  title,
  description,
  shippingInformation,
  price,
  returnPolicy,
  tags,
}) {
  const tagsMarkup = tags.map(tag => `<li>${tag}</li>`).join('');
  const markup = `<img class="modal-product__img" src="${images[0]}" alt="${title}" />

<div class="modal-product__content"> <p class="modal-product__title">${title}</p>
<ul class="modal-product__tags">${tagsMarkup}</ul> <p class="modal-product__description">${description}</p>
<p class="modal-product__shipping-information">Shipping: ${shippingInformation}</p>
<p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
<p class="modal-product__price">Price: ${price}$</p>
<button class="modal-product__buy-btn" type="button">Buy</button> </div>`;
  refs.modalProduct.innerHTML = markup;
  updateModalButtons(id);
}

export function updateModalButtons(id) {
  if (isInWishlist(id)) {
    refs.addToWishListBtn.textContent = 'Remove from Wishlist';
  } else {
    refs.addToWishListBtn.textContent = 'Add to Wishlist';
  }
  if (isInCart(id)) {
    refs.addToCartBtn.textContent = 'Remove from Cart';
  } else {
    refs.addToCartBtn.textContent = 'Add to Cart';
  }
}

export function updateCounters(wishlistItems, cartItems) {
  refs.whishlistCount.textContent = wishlistItems.length;
  refs.cartCount.textContent = cartItems.length;
}

export function showLoadMoreButton() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  refs.loadMoreBtn.classList.add('is-hidden');
  refs.loadMoreBtn.classList.remove('is-loading');
}

export function showLoadMoreButtonLoading() {
  refs.loadMoreBtn.classList.add('is-loading');
}

export function hideLoadMoreButtonLoading() {
  refs.loadMoreBtn.classList.remove('is-loading');
}

export function updateCartSummary(products) {
  refs.cartSummaryValue.textContent = products.length;
  const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
  refs.cartPrice.textContent = totalPrice.toFixed(2) + '$';
}
