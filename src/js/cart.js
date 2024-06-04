import { products } from "./data.js";

const productContainer = document.querySelector("#product-container");
const cartContainer = document.querySelector(".cart-container");
const totalPrice = document.querySelector(".total-price");
let cart = [];

products.forEach((product) => {
  let { id, imgSrc, categoryName, title, salePrice, price } = product;
  let productCard = generateProductCard(
    id,
    imgSrc,
    categoryName,
    title,
    salePrice,
    price
  );
  productContainer.innerHTML += productCard;
});

function generateProductCard(
  id,
  imgSrc,
  categoryName,
  title,
  salePrice,
  price
) {
  let priceHTML;
  if (salePrice) {
    priceHTML = `<span class="sale-price">$${salePrice} <span>$${price}</span></span>`;
  } else {
    priceHTML = `<span class="price">$${price}</span>`;
  }

  let productCard = `
    <div class="col-md-3 mb-4">
    <div class="product-item text-center">
      <img
        src="${imgSrc}"
        alt="img"
        class="img-fluid"
      />
      <p>${title}</p>
      <span>${categoryName}</span>
      ${priceHTML}
      <button class="btn-add px-2 py-1 b-1 rounded-1" data-id=${id}>add</button>
    </div>
  </div>`;
  return productCard;
}

window.addEventListener("load", () => {
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  if (storedCart) {
    cart = storedCart;
    renderCart();
    updateCartCount();
  }
});

function updateCart(cart) {
  updateLocalStorage(cart);
  renderCart(cart);
  updateCartCount(cart);
}

function updateLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

document.querySelectorAll(".btn-add").forEach((btn) => {
  btn.onclick = (e) => {
    let id = e.target.getAttribute("data-id");
    let product = products.find((p) => p.id == id);

    if (product) {
      let cartItem = cart.find((item) => item.id == id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        cart.push({ id, product, quantity: 1 });
      }

      renderCart();
      updateCartCount();
      updateLocalStorage();
      updateCart(cart);
    }
  };
});

function renderCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML =
      "<p class='fw-bold fs-4'>The basket is empty.</p>";
    totalPrice.innerHTML = "";
    hideCheckoutSection();
    cartContainer.style.overflowY = "hidden";
  } else {
    cart.forEach((cartItem) => {
      let { id, product, quantity } = cartItem;
      let cartItemHTML = `
            <div class="modal__product__section__cart__list">
                <div class="modal__product__section__cart__list__img">
                  <img src="${product.imgSrc}" alt="${product.title}">
                </div>
                <div class="modal__product__section__cart__list__info">
                  <a href="#">${product.title}</a>
                  <small class="text-muted">Quantity: ${quantity}</small>
                  <strong>$${product.price * quantity}</strong>
                </div>
                <div class="modal__product__section__cart__list__close mb-3">
                  <i class="bi bi-x-lg delete-btn" data-id="${id}"></i>
                </div>
                <hr class="pb-3 w-100">
              </div>`;
      cartContainer.innerHTML += cartItemHTML;

      total += product.price * quantity;
      showCheckoutSection();
      cartContainer.style.overflowY = "auto";
    });
  }

  totalPrice.innerHTML = `<h3>Subtotal:</h3>
                    <span>$${total.toFixed(2)}</span>`;
}

function hideCheckoutSection() {
  const checkoutSection = document.querySelector(
    ".modal__product__section__total"
  );
  checkoutSection.style.display = "none";

  const checkoutButtons = document.querySelectorAll(
    ".modal__product__section__btn a"
  );
  checkoutButtons.forEach((button) => {
    button.style.display = "none";
  });
}

function showCheckoutSection() {
  const checkoutSection = document.querySelector(
    ".modal__product__section__total"
  );
  checkoutSection.style.display = "flex";

  const checkoutButtons = document.querySelectorAll(
    ".modal__product__section__btn a"
  );
  checkoutButtons.forEach((button) => {
    button.style.display = "block";
  });
}

cartContainer.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("delete-btn")) {
    const id = target.getAttribute("data-id");
    cart = cart.filter((item) => item.id != id);
    renderCart();
    updateCartCount();
    updateCart(cart);
  }
});

function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  cartCountElement.textContent = count;
}
