const data = [
  {
    id: 1,
    name: "High-Back Bench",
    price: 9.9,
    image: "./images/product-1.jpeg",
    company: "Ikea",
    count: 1,
  },

  {
    id: 2,
    name: "Utopia Safe",
    price: 39.95,
    image: "./images/product-2.jpeg",
    company: "Liddy",
    count: 1,
  },

  {
    id: 3,
    name: "Entertainment Center",
    price: 29.98,
    image: "./images/product-3.jpeg",
    company: "Liddy",
    count: 1,
  },

  {
    id: 4,
    name: "Albany Table",
    price: 79.99,
    image: "./images/product-4.jpeg",
    company: "Ikea",
    count: 1,
  },

  {
    id: 5,
    name: "Accent Chair",
    price: 25.99,
    image: "./images/product-5.jpeg",
    company: "Ikea",
    count: 1,
  },

  {
    id: 6,
    name: "Wooden Table",
    price: 45.99,
    image: "./images/product-6.jpeg",
    company: "Liddy",
    count: 1,
  },

  {
    id: 7,
    name: "Dining Table",
    price: 6.99,
    image: "./images/product-7.jpeg",
    company: "Marcos",
    count: 1,
  },

  {
    id: 8,
    name: "Sofa Set",
    price: 69.99,
    image: "./images/product-8.jpeg",
    company: "Caressa",
    count: 1,
  },

  {
    id: 9,
    name: "Modern Bookshelf",
    price: 8.99,
    image: "./images/product-4.jpeg",
    company: "Ikea",
    count: 1,
  },

  {
    id: 10,
    name: "High-Back Bench",
    price: 9.9,
    image: "./images/product-1.jpeg",
    company: "Marcos",
    count: 1,
  },

  {
    id: 11,
    name: "Utopia Safe",
    price: 39.95,
    image: "./images/product-2.jpeg",
    company: "Caressa",
    count: 1,
  },

  {
    id: 12,
    name: "Entertainment Center",
    price: 29.98,
    image: "./images/product-3.jpeg",
    company: "Marcos",
    count: 1,
  },
];

const cartCount = document.querySelector(".cart-size");
const cartItems = document.querySelector(".cart-items");
const reloadCart = document.querySelector(".cart-div");
const checkoutPrice = document.querySelector(".total-checkout-price");
const goToCart = document.querySelector(".go-to-cart");

// Variables
let cartProducts = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
let selectedItem = cartProducts.length === undefined ? 0 : cartProducts.length;
// In the beginning
// addListener();
window.addEventListener("DOMContentLoaded", function () {
  cartCount.innerText = selectedItem;
  updatePrice();
});

reloadCart.addEventListener("click", function () {
  removeCartElements();
  for (let i = 0; i < cartProducts.length; i++) {
    cartItems.appendChild(makeCartItems(cartProducts[i]));
  }
});
goToCart.addEventListener("click", function () {
  removeCartElements();
  for (let i = 0; i < cartProducts.length; i++) {
    cartItems.appendChild(makeCartItems(cartProducts[i]));
  }
});
// Functions
function makeElement(productDetails) {
  const element = document.createElement("section");
  element.classList.add("comfy-item");
  const attr = document.createAttribute("data-id");
  attr.value = productDetails.id;
  element.setAttributeNode(attr);
  element.innerHTML = `
  <div class="col">
                <div class="card">
                  <img
                    src=${productDetails.image}
                    class="card-img-top"
                    alt=""
                  />
                  <div class="show-icon">
                    <div class="circle-icon mx-3 search-item">
                      <button class="buton" style="color: white">
                        <i class="bi bi-search h5"></i>
                      </button>
                    </div>
                    <div class="circle-icon mx-3 add-to-cart" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      <button class="buton" style="color: white">
                        <i class="bi bi-cart-fill h5"></i>
                      </button>
                    </div>
                  </div>
                  <div class="card-body">
                    <h5 class="product-title">${productDetails.name}</h5>
                    <h5 class="product-price">$${productDetails.price}</h5>
                  </div>
                </div>
              </div>
  `;

  const searchItem = element.querySelector(".search-item");
  const addToCart = element.querySelector(".add-to-cart");

  searchItem.addEventListener("click", function () {
    window.location.href = "single-product.html?id=" + productDetails.id;
  });

  addToCart.addEventListener("click", function () {
    pushInCart(productDetails.id);
  });
  return element;
}

function removeElements() {
  while (productsList.firstChild) {
    productsList.removeChild(productsList.lastChild);
  }
}

function removeCartElements() {
  while (cartItems.firstChild) {
    cartItems.removeChild(cartItems.lastChild);
  }
}

function makeCartItems(product) {
  const element = document.createElement("section");
  element.classList.add("cart-product");
  const attr = document.createAttribute("data-id");
  attr.value = product.id;
  element.setAttributeNode(attr);
  element.innerHTML = `
  <div class="row my-4">
  <div class="col-3 d-flex align-items-center">
    <img
      src=${product.image}
      class="img-fluid cart-item-img"
      alt=""
    />
  </div>
  <div class="col-7">
    <p class="cart-item-detail">
      <span class="cart-item-name">${product.name}</span>
      <br />
      <span class="cart-item-price">$${product.price}</span>
      <br />
      <button class="cart-item-remove">remove</button>
    </p>
  </div>
  <div class="col-2 text-center">
    <button class="buton increase">
      <i class="bi icon-up bi-chevron-up"></i>
    </button>
    <div class="cart-item-count">${product.count}</div>
    <button class="buton decrease">
      <i class="bi icon-up bi-chevron-down"></i>
    </button>
  </div>
</div>
  `;
  const incBtn = element.querySelector(".increase");
  const decBtn = element.querySelector(".decrease");
  const currentItemCount = element.querySelector(".cart-item-count");
  const removeBtn = element.querySelector(".cart-item-remove");

  incBtn.addEventListener("click", function () {
    incrementItem(product.id);
    currentItemCount.innerText = parseInt(currentItemCount.innerText) + 1;
    updatePrice();
  });
  decBtn.addEventListener("click", function () {
    if (parseInt(currentItemCount.innerText) > 1) {
      currentItemCount.innerText = parseInt(currentItemCount.innerText) - 1;
      decreaseItem(product.id);
      updatePrice();
    }
  });
  removeBtn.addEventListener("click", function (e) {
    removeFromLocalStorage(product.id);
    cartItems.removeChild(element);
    selectedItem--;
    cartCount.innerText = selectedItem;
    updatePrice();
  });
  return element;
}

function addListener() {
  searchItem = document.querySelectorAll(".search-item");
  addToCart = document.querySelectorAll(".add-to-cart");

  searchItem.forEach(function (item) {
    item.addEventListener("click", function (e) {
      const element =
        e.currentTarget.parentElement.parentElement.parentElement.parentElement;

      window.location.href = "single-product.html?id=" + element.dataset.id;
    });
  });

  addToCart.forEach(function (item) {
    item.addEventListener("click", pushInCart);
  });
}

function pushInCart(id) {
  // const element =
  //   e.currentTarget.parentElement.parentElement.parentElement.parentElement;

  let product = null;

  for (let i = 0; i < data.length; i++) {
    if (parseInt(id) === data[i].id) {
      product = data[i];
      break;
    }
  }
  if (!alreadyExist(product.id)) {
    cartItems.appendChild(makeCartItems(product));
    // addCartListener();
    addToLocalStorage(product.id);
    selectedItem++;
    cartCount.innerText = selectedItem;
  } else {
    incrementItem(product.id);
  }
  updatePrice();
}

function addToLocalStorage(id) {
  let product = null;
  for (let i = 0; i < data.length; i++) {
    if (parseInt(id) === data[i].id) {
      product = data[i];
      break;
    }
  }
  cartProducts.push(product);
  localStorage.setItem("cart", JSON.stringify(cartProducts));
}

function alreadyExist(id) {
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].id === parseInt(id)) {
      return true;
    }
  }
  return false;
}

function incrementItem(id) {
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].id === parseInt(id)) {
      cartProducts[i].count++;
      break;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cartProducts));
}

function decreaseItem(id) {
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].id === parseInt(id)) {
      cartProducts[i].count--;
      break;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cartProducts));
}

function removeFromLocalStorage(id) {
  let item = -1;
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].id === parseInt(id)) {
      item = i;
      break;
    }
  }
  if (item != -1) {
    cartProducts.splice(item, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cartProducts));
}

function updatePrice() {
  let price = 0.0;
  for (let i = 0; i < cartProducts.length; i++) {
    price +=
      parseFloat(cartProducts[i].count) * parseFloat(cartProducts[i].price);
  }
  checkoutPrice.innerText = price.toFixed(2);
}