import all_products from "./all_products.js";

const products_container = document.querySelector("#products");

let carrito = [];

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

    console.log(carrito);
};

const mostrarProducto = (producto) => {

    const fragment = document.createDocumentFragment();

    const container_product = document.createElement("div");

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