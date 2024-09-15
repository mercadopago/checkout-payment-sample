import all_products from "./all_products.js";

const mp = new MercadoPago('<public key>', {
    locale: 'es-AR'
});
const bricksBuilder = mp.bricks();

const mountMPButton = async (preferenceId) => {
    bricksBuilder.create("wallet", "wallet_container", {
        initialization: {
            preferenceId
        }
    })
}

class Carrito {

    constructor() {
        this.products = [];

        this.content = document.querySelector("#carrito .container");
        this.element = document.querySelector("#carrito");
        this.open_button = document.querySelector("button#open-cart");
        this.close_button = document.querySelector("button#close-cart");

        this.open_button.addEventListener("click", () => this.open());
        this.close_button.addEventListener("click", () => this.close());
    }

    open() {
        this.element.classList.toggle("invisible");
    }

    close() {
        this.element.classList.toggle("invisible");
    }

    addProduct(product) {
        const in_cart = this.products.find(
            element => element.id == product.id
        );

        if (!in_cart) {
            this.products.push({ ...product, quantity: 1 });
        } else {
            this.products = this.products.map(element => {
                if (element.id !== product.id) return element;
                return { ...element, quantity: element.quantity + 1 };
            });
        }

        this.updateView();
    }

    removeProduct(product_id) {
        this.products = this.products.filter(
            product => product.id !== product_id
        );
        this.updateView();
    }

    getRowFromProduct(product) {
        const product_row = document.createElement("div");
        product_row.classList.add("product-row");

        const product_title = document.createElement("p");
        product_title.innerText = `${product.title} x ${product.quantity}`;

        const product_price = document.createElement("span");
        product_price.innerText = `$ ${product.price}`;

        const remove_button = document.createElement("button");
        remove_button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        `;
        remove_button.addEventListener("click", () => this.removeProduct(product.id));

        product_row.appendChild(product_title);
        product_row.appendChild(product_price);
        product_row.appendChild(remove_button);

        return product_row;
    }

    getTotalPrice() {
        return this.products.reduce(
            (total, product) => total + (product.price * product.quantity), 0
        );
    }

    async generateNewMPButton(self) {

        console.log(self.products);

        try {

            const response = await fetch("/mp/preference", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    'products': self.products
                })
            });

            const preference = await response.json();

            mountMPButton(preference.id);

        } catch (error) {
            console.error(error);
        }

    }

    updateView() {
        this.content.innerHTML = "";

        if (this.products.length === 0) {
            const empty_message = document.createElement("span");
            empty_message.innerText = "Carrito vacío 🛒";
            this.content.appendChild(empty_message);
            return;
        }

        const fragment = document.createDocumentFragment();

        this.products.forEach(product => {
            const row = this.getRowFromProduct(product);
            fragment.appendChild(row);
        });

        const total_row = document.createElement("div");
        total_row.classList.add("total-row");

        const total_text = document.createElement("p");
        total_text.innerText = "Total: ";

        const total_amount = document.createElement("span");
        total_amount.innerText = `$ ${this.getTotalPrice()}`;

        const buy_button = document.createElement("button");
        buy_button.id = "buy";
        buy_button.innerText = "Comprar";
        buy_button.addEventListener("click", () => this.generateNewMPButton(this));

        const wallet_container = document.createElement("div");
        wallet_container.id = "wallet_container";


        total_row.appendChild(total_text);
        total_row.appendChild(total_amount);

        fragment.appendChild(total_row);
        fragment.appendChild(buy_button);
        fragment.appendChild(wallet_container);

        this.content.appendChild(fragment);
    }

}


const carrito = new Carrito();
const products_section = document.querySelector("#products");

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
    buy_button.addEventListener("click", () => carrito.addProduct(producto));

    body.appendChild(buy_button);

    container_product.appendChild(header);
    container_product.appendChild(body);

    fragment.appendChild(container_product);

    products_section.appendChild(fragment);

}

all_products.forEach(producto => mostrarProducto(producto));