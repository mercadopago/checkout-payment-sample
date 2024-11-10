const mp = new MercadoPago('APP_USR-a50a3f8c-5878-49db-9b44-bf263f2b06ff', {
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
        this.products = this.loadCartFromLocalStorage();

        this.content = document.querySelector("#carrito .container");
        this.element = document.querySelector("#carrito");
        this.open_button = document.querySelector("button#open-cart");
        this.close_button = document.querySelector("button#close-cart");

        this.open_button.addEventListener("click", () => this.open());
        this.close_button.addEventListener("click", () => this.close());

        this.updateView();
    }

    getFullCartIcon() {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clip-rule="evenodd" />
</svg>
`;
    }

    getEmptyCartIcon() {
        return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>`;
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

        this.open_button.innerHTML = this.getFullCartIcon();

        this.updateLocalStorage();
        this.updateView();
    }

    removeProduct(product_id) {
        this.products = this.products.filter(
            product => product.id !== product_id
        );

        if (this.products.length == 0) this.open_button.innerHTML = this.getEmptyCartIcon();

        this.updateLocalStorage();
        this.updateView();
    }

    getRowFromProduct(product) {
        const product_row = document.createElement("div");
        product_row.classList.add("product-row");

        const product_title = document.createElement("p");
        product_title.innerText = `${product.name} x ${product.quantity}`;

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
        let total_price = this.products.reduce(
            (total, product) => total + (product.price * product.quantity), 0
        );

        if (localStorage.getItem('token')) {
            total_price -= total_price * 0.01;
            total_price = `${total_price} (Descuento: 1%)`;
        }

        return total_price;
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
            this.open_button.innerHTML = this.getEmptyCartIcon();
            const empty_message = document.createElement("span");
            empty_message.innerText = "Carrito vacío 🛒";
            this.content.appendChild(empty_message);
            return;
        }

        const fragment = document.createDocumentFragment();

        this.open_button.innerHTML = this.getFullCartIcon();

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

    loadCartFromLocalStorage() {
        const cart = localStorage.getItem("cart");
        return cart ? JSON.parse(cart) : [];
    }

    updateLocalStorage() {
        localStorage.setItem("cart", JSON.stringify(this.products));
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
    title.innerText = producto.name;
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

document.addEventListener("DOMContentLoaded", async () => {

    const saved_products_str = window.sessionStorage.getItem("data");

    if (saved_products_str) {

        console.log("Se evito una llamada al servidor");

        const saved_products = JSON.parse(saved_products_str);

        saved_products.forEach(producto => mostrarProducto(producto));

        return;

    }

    console.log("Se hizo una llamada al servidor");

    const res = await fetch('/products', {
        headers: {
            'content-type': "json/application"
        }
    });

    const data = await res.json();

    const { products } = data;

    console.log(products);

    products.forEach(producto => mostrarProducto(producto));

    window.sessionStorage.setItem("data", JSON.stringify(products));
});