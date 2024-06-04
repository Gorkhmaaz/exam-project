import "../scss/styles.scss";
import * as bootstrap from "bootstrap";
import { loadingProducts } from "../js/controller/productController";
import { ff } from "./page";

document.addEventListener("DOMContentLoaded", () => {
  const brandBannerBtn = document.querySelector(".brand-banner__btn");
  brandBannerBtn.addEventListener("click", ff);
});

loadingProducts()
  .then((result) => {
    return result;
  })
  .catch((err) => {
    console.log(err);
  });

////Modal
document.addEventListener("DOMContentLoaded", function () {
  const accountButton = document.getElementById("accountButton");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const showRegisterLink = document.getElementById("showRegister");
  const showLoginLink = document.getElementById("showLogin");

  if (localStorage.getItem("registered") === "true") {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    showRegisterLink.style.display = "none";
    showLoginLink.style.display = "none";
  }

  accountButton.addEventListener("click", function (event) {
    event.preventDefault();
    let myModal = new bootstrap.Modal(document.getElementById("loginModal"));
    myModal.show();

    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      document.getElementById("loginEmail").value = savedEmail;
    }
  });

  showRegisterLink.addEventListener("click", function (event) {
    event.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    showRegisterLink.style.display = "none";
    showLoginLink.style.display = "block";
  });

  showLoginLink.addEventListener("click", function (event) {
    event.preventDefault();
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    showRegisterLink.style.display = "block";
    showLoginLink.style.display = "none";
  });

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let email = document.getElementById("registerEmail").value;
    let password = document.getElementById("registerPassword").value;
    let confirmPassword = document.getElementById(
      "registerConfirmPassword"
    ).value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    localStorage.setItem("registered", "true");
    localStorage.setItem("email", email);
    alert("Registration successful");
    registerForm.reset();
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    showRegisterLink.style.display = "none";
    showLoginLink.style.display = "none";
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    alert("Login successful");
    loginForm.reset();
    const myModal = bootstrap.Modal.getInstance(
      document.getElementById("loginModal")
    );
    myModal.hide();
  });
});

{
  document.addEventListener("DOMContentLoaded", function () {
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const modal = document.getElementById("myModal");

    openModalBtn.addEventListener("click", function () {
      modal.style.display = "block";
    });

    closeModalBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  document
    .querySelector(".modal__product__section__cart")
    .addEventListener("mouseover", function () {
      this.style.cursor = "pointer";
    });

  document
    .querySelector(".modal__product__section__cart")
    .addEventListener("mouseout", function () {
      this.style.cursor = "auto";
    });
}
