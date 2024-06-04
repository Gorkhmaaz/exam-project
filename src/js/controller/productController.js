import { receivingTheProducts } from "../model/productsModel";
import { displayProducts } from "../view/productsView";

export const loadingProducts = async () => {
  try {
    const products = await receivingTheProducts();
    displayProducts(products);
  } catch (error) {
    console.log("Ошибка при загрузке продуктов:", error);
  }
};
