// ДЛЯ СЛАЙДЕРА МОДЕЛ
import axios from "axios";

const API_KEY_PRODUCTS = "http://localhost:3000/bestsellers?_limit=4";

export const receivingTheProducts = async () => {
  try {
    const response = await axios.get(API_KEY_PRODUCTS);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};
