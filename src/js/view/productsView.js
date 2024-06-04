export const displayProducts = (products) => {
  const sliderListProducts = document.querySelector(".slider-list__products");
  sliderListProducts.innerHTML = "";
  products.forEach((product) => {
    const sliderListItem = document.createElement("li"); // исправлено 'slider-list__item' на 'li'
    sliderListItem.classList.add("slider-list__item"); // добавлен класс для элемента
    sliderListItem.innerHTML = `
    <div class="slider-list__item-inner">
      <div class="slider-list__products-add-cart">
        <img 
          src="./images/slider-products/icons-heart.png"
          alt="HEART" width="24" height="24"/>
      </div>
      <img class="slider-list__items-img" src="${product.photo}" alt="Products" width="312" height="400" />
      <p class="slider-list__items-name">${product.name}</p>
      <div class="slider-list__products-info">
        <p class="slider-list__items-type">${product.type}</p>
        <p class="slider-list__items-price">${product.price}</p>
      </div>
    </div>
  `;
    sliderListProducts.appendChild(sliderListItem);
  });
};
