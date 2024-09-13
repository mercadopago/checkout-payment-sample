import all_products from "./all_products.js";

const products_container = document.querySelector("#products");
const carrito_element = document.querySelector("#carrito");

const abrir_carrito = document.querySelector("#open-cart");
const cerrar_carrito = document.querySelector("#close-cart");

let carrito = [];

abrir_carrito.addEventListener("click", () => {
    carrito_element.classList.toggle("invisible");
});

cerrar_carrito.addEventListener("click", () => {
    carrito_element.classList.toggle("invisible");
});

const ponerEnElCarrito = (producto) => {
    const el_producto_esta = carrito.find(elemento => elemento.id === producto.id);

    if (!el_producto_esta) {
        carrito.push({ ...producto, quantity: 1 });
    } else {
        carrito = carrito.map(elemento =>
            elemento.id === producto.id
                ? { ...elemento, quantity: elemento.quantity + 1 }
                : elemento
        );
    }

    actualizarCarritoVisual();

    console.log(carrito);
};

const actualizarCarritoVisual = () => {
    const carrito_container = document.querySelector("#carrito .container");
    carrito_container.innerHTML = ""; // Limpiar el contenido actual del carrito

    if (carrito.length === 0) {
        const empty_message = document.createElement("span");
        empty_message.innerText = "Carrito vacío 🛒";
        carrito_container.appendChild(empty_message);
    } else {
        carrito.forEach((producto) => {
            const product_row = document.createElement("div");
            product_row.classList.add("product-row");

            const product_title = document.createElement("p");
            product_title.innerText = `${producto.title} x ${producto.quantity}`;

            const product_price = document.createElement("span");
            product_price.innerText = `$ ${producto.price * producto.quantity}`;

            product_row.appendChild(product_title);
            product_row.appendChild(product_price);

            carrito_container.appendChild(product_row);
        });

        const total_price = carrito.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        const total_row = document.createElement("div");
        total_row.classList.add("total-row");

        const total_text = document.createElement("p");
        total_text.innerText = "Total:";

        const total_amount = document.createElement("span");
        total_amount.innerText = `$ ${total_price}`;

        total_row.appendChild(total_text);
        total_row.appendChild(total_amount);

        carrito_container.appendChild(total_row);
    }
};

const mostrarProducto = (producto) => {

    const fragment = document.createDocumentFragment();

    const container_product = document.createElement("div");
    container_product.classList.add("container");

    const header = document.createElement("div");

    const image = document.createElement("img");

    const body = document.createElement("div");

    const title = document.createElement("p");

    const price = document.createElement("span");

    image.src = producto.image;
    title.innerText = producto.title;
    price.innerText = `$ ${producto.price}`;

    header.appendChild(image);
    body.appendChild(title);
    body.appendChild(price);

    const buy_button = document.createElement("button");
    buy_button.innerText = "Comprar";
    buy_button.addEventListener("click", () => ponerEnElCarrito(producto));

    body.appendChild(buy_button);

    container_product.appendChild(header);
    container_product.appendChild(body);

    fragment.appendChild(container_product);

    products_container.appendChild(fragment);

}

all_products.forEach(producto => mostrarProducto(producto));