const singleProduct = document.querySelector(".single-product");

const item = location.search.substring(1).split("=");

const id = item[1];
let currentProduct = null;
for (let i = 0; i < data.length; i++) {
  if (data[i].id === parseInt(id)) {
    currentProduct = data[i];
    break;
  }
}

singleProduct.innerHTML = `
<div class="row row-cols-1 row-cols-lg-2">
<div class="col">
  <img
    src=${currentProduct.image}
    alt=""
    class="img-fluid single-product-image"
  />
</div>
<div class="col">
  <h1 class="heading single-product-name">${currentProduct.name}</h1>
  <h5 class="single-product-company">By ${currentProduct.company}</h5>
  <h5 class="single-product-price py-4">$${currentProduct.price}</h5>
  <p class="single-product-info">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
    quod exercitationem facilis minus quibusdam fugit nostrum
    doloribus aliquam repellendus ducimus?
  </p>
  <button class="btn-coffee add-to-cart-btn" style="font-size: 1rem" data-bs-toggle="modal" data-bs-target="#exampleModal">
    ADD TO CART
  </button>
</div>
`;

addToCartButton = document.querySelector(".add-to-cart-btn");

addToCartButton.addEventListener("click", function () {
  if (!alreadyExist(currentProduct.id)) {
    cartItems.appendChild(makeCartItems(currentProduct));
    addToLocalStorage(currentProduct.id);
    selectedItem++;
    cartCount.innerText = selectedItem;
  } else {
    incrementItem(currentProduct.id);
  }
  updatePrice();
});