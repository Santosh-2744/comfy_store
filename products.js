const productsList = document.querySelector(".all-products");
const sidebarLinks = document.querySelectorAll(".sidebar-link");
const slider = document.querySelector(".slider");
const sliderValue = document.querySelector(".slider-value");
const searchProduct = document.querySelector(".search-value");

window.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < data.length; i++) {
    const element = makeElement(data[i]);
    productsList.appendChild(element);
  }
  // addListener();
  sliderValue.innerText = slider.value;
});

sidebarLinks.forEach(function (item) {
  item.addEventListener("click", function (e) {
    const ele = e.currentTarget.classList;
    removeElements();
    if (ele.contains("all")) {
      for (let i = 0; i < data.length; i++) {
        const element = makeElement(data[i]);
        productsList.appendChild(element);
      }
    } else if (ele.contains("ikea")) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].company === "Ikea") {
          const element = makeElement(data[i]);
          productsList.appendChild(element);
        }
      }
    } else if (ele.contains("marcos")) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].company === "Marcos") {
          const element = makeElement(data[i]);
          productsList.appendChild(element);
        }
      }
    } else if (ele.contains("caressa")) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].company === "Caressa") {
          const element = makeElement(data[i]);
          productsList.appendChild(element);
        }
      }
    } else if (ele.contains("liddy")) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].company === "Liddy") {
          const element = makeElement(data[i]);
          productsList.appendChild(element);
        }
      }
    }
    // addListener();
  });
});

slider.oninput = function () {
  const currentValue = this.value;
  sliderValue.innerText = currentValue;
  removeElements();
  for (let i = 0; i < data.length; i++) {
    if (data[i].price <= currentValue) {
      productsList.appendChild(makeElement(data[i]));
    }
  }
  // addListener();
};

searchProduct.oninput = function () {
  const currentValue = this.value;
  removeElements();
  for (let i = 0; i < data.length; i++) {
    const str = data[i].name.toLowerCase();
    const comp = currentValue.toLowerCase();
    if (str.includes(comp)) {
      productsList.appendChild(makeElement(data[i]));
    }
  }
  // addListener();
};