import axios from "axios";

export async function ff() {
  try {
    const response = await axios.get("http://localhost:3000/products");
    const products = response.data;
    const productsContainer = document.querySelector(".list-product");
    productsContainer.innerHTML = "";
    products.forEach((product) => {
      const productLi = document.createElement("li");
      productLi.innerHTML = `
        <h2>${product.name}</h2>
        <p>Type: ${product.type}</p>
        <p>Price: $${product.price}</p>
        <img src="${product.photo}" alt="${product.name}" width="200">
      `;
      productsContainer.appendChild(productLi);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
