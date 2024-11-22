const BASE_URL = "https://67361efa5995834c8a95839a.mockapi.io/products";

// Función para obtener todos los productos
const productList = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error("Error al obtener la lista de productos.");
    }
    return await response.json();
  } catch (error) {
    console.log("Error al listar productos:", error);
    return [];
  }
};

// Función para crear un producto
const createProduct = async (name, price, image) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, image }),
    });

    if (!response.ok) {
      throw new Error("Error al crear el producto.");
    }

    return await response.json();
  } catch (error) {
    console.log("Error al crear el producto:", error);
  }
};

// Función para eliminar un producto
const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error(`Error al eliminar el producto con ID ${id}`);
    }
  } catch (error) {
    console.log("Error al eliminar el producto:", error);
  }
};





// Exportar las funciones como un objeto
export const servicesProducts = {
  productList,
  createProduct,
  deleteProduct,
};

