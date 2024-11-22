import { servicesProducts } from "../services/products-service.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard({ name, price, image, id }) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", id); // Asociar el ID al elemento card
  card.innerHTML = `
    <div class="img-container">
        <img src="${image}" alt="imagen producto">
    </div>
    <div class="card-container--info">
        <p>${name}</p>
    </div>
    <section class="inferior">
        <div class="card-container--value">
            <p>$${price}</p>
        </div>
        <button class="delete-button" data-id="${id}">
            <img src="images/Vector.png" alt="eliminar">
        </button>
    </section>
  `;

  return card;
}

const renderProducts = async () => {
  try {
    const listProducts = await servicesProducts.productList();
    listProducts.forEach((product) => {
      const productCard = createCard(product);
      productContainer.appendChild(productCard);
    });
  } catch (error) {
    console.log("Error al renderizar productos:", error);
  }
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
  const image = document.querySelector("[data-image]").value;

  try {
    const newProduct = await servicesProducts.createProduct(name, price, image);
    const newCard = createCard(newProduct);
    productContainer.appendChild(newCard);
  } catch (error) {
    console.log("Error al agregar producto:", error);
  }
  form.reset();
});

productContainer.addEventListener("click", async (event) => {
  if (event.target.closest(".delete-button")) {
    const button = event.target.closest(".delete-button");
    const productId = button.dataset.id; // Obtener el ID del dataset

    try {
      await servicesProducts.deleteProduct(productId); // Llamar a la función para eliminar el producto en la API
      const productCard = button.closest(".card"); // Encontrar la tarjeta completa
      productCard.remove(); // Eliminar la tarjeta del DOM
      console.log(`Producto con ID ${productId} eliminado correctamente.`);
    } catch (error) {
      console.log(`Error al eliminar el producto con ID ${productId}:`, error);
    }
  }
});


// Añadir un evento de escucha para el evento input en el campo de búsqueda
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", searchProducts);

// Definir la función para buscar productos
async function searchProducts() {
  const keyword = searchInput.value.toLowerCase(); // Convertir la palabra clave a minúsculas para la búsqueda sin distinción entre mayúsculas y minúsculas

  try {
    const listProducts = await servicesProducts.productList();
    const filteredProducts = listProducts.filter((product) =>
      product.name.toLowerCase().includes(keyword)
    );

    // Limpiar el contenedor de productos
    productContainer.innerHTML = "";

    // Renderizar los productos filtrados
    filteredProducts.forEach((product) => {
      const productCard = createCard(product);
      productContainer.appendChild(productCard);
    });
  } catch (error) {
    console.log("Error al renderizar productos:", error);
  }
}





renderProducts();

