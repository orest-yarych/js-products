import"./assets/styles-JE8YjOlG.js";import{a as r}from"./assets/vendor-N5iQpiFS.js";function p(t,e,s){t.forEach(o=>{o.classList.remove(s)}),e.classList.add(s)}const _="https://dummyjson.com",n={CATEGORIES:"/products/category-list",PRODUCTS:"/products",PRODUCTS_BY_CATEGORY:"/products/category/"};r.defaults.baseURL=_;async function i(){const{data:t}=await r(n.PRODUCTS);return t}async function m(){const{data:t}=await r(n.CATEGORIES);return t}async function y(t){const{data:e}=await r(`${n.PRODUCTS_BY_CATEGORY}${t}`);return e}const a={categoriesList:document.querySelector(".categories"),productsList:document.querySelector(".products")};function C(t){const s=["All",...t].map(c=>`<li class="categories__item">
  <button class="categories__btn" type="button">${c}</button>
</li>
`).join("");a.categoriesList.innerHTML=s,document.querySelector(".categories__btn").classList.add("categories__btn--active")}function d(t){const e=t.map(({id:s,thumbnail:o,title:c,category:u,brand:l,price:g})=>`<li class="products__item" data-id="${s}">
    <img class="products__image" src="${o}" alt="${c}"/>
    <p class="products__title">${c}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${l}</span></p>
    <p class="products__category">Category: ${u}</p>
    <p class="products__price">Price: ${g}$</p>
 </li>`).join("");a.productsList.insertAdjacentHTML("beforeend",e)}function f(){a.productsList.innerHTML=""}async function L(t){try{const e=await m();C(e);const{products:s}=await i();d(s)}catch(e){console.error(`Помилка ініціанілізації сторінки Home ${e}`)}}async function A(t){if(t.target.nodeName==="BUTTON"){f();try{const e=t.target.textContent,s=document.querySelectorAll(".categories__btn");p(s,t.target,"categories__btn--active");let o;e==="All"?o=await i():o=await y(e),console.log(o),d(o.products)}catch(e){console.log(`Помилка отримання продуктів по категорії ${e}`)}}}document.addEventListener("DOMContentLoaded",L);a.categoriesList.addEventListener("click",A);
//# sourceMappingURL=index.js.map
