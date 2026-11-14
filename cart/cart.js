const state = {
    products: [
        { id: 1, name: "Mandazi (pack of 6)", price: 120, image: "🍩" },
        { id: 2, name: "Chapati (pack of 5)", price: 150, image: "🫓" },
        { id: 3, name: "Tea leaves 250g", price: 180, image: "🍵" },
    ],
    cart: loadCart(),
};

function loadCart() {
    try {
        const saved = JSON.parse(localStorage.getItem("shopping-cart"));
        if (!Array.isArray(saved)) {
            return [];
        }

        return saved.filter(
            (item) =>
                Number.isInteger(item.productId) &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0
        );
    } catch {
        return [];
    }
}

function saveCart() {
    try {
        localStorage.setItem("shopping-cart", JSON.stringify(state.cart));
    } catch (error) {
        console.error("Could not save cart:", error);
    }
}

function updateCart() {
    saveCart();
    renderCart();
}

function addToCart(productId) {
    const existing = state.cart.find((item) => item.productId === productId);

    if (existing) {
        existing.quantity++;
    } else {
        state.cart.push({ productId, quantity: 1 });
    }

    updateCart();
}

function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = state.cart.find((item) => item.productId === productId);
    if (item) {
        item.quantity = quantity;
    }

    updateCart();
}

function removeFromCart(productId) {
    state.cart = state.cart.filter((item) => item.productId !== productId);
    updateCart();
}

function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find((p) => p.id === item.productId);
        return product ? total + product.price * item.quantity : total;
    }, 0);
}

function getCartCount() {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
}

function renderProducts() {
    const productList = document.getElementById("product-list");

    productList.replaceChildren();

    state.products.forEach((product) => {
        const div = document.createElement("div");
        div.className = "product";

        const name = document.createElement("span");
        name.textContent = `${product.image} ${product.name} - KSh ${product.price}`;

        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.addEventListener("click", () => addToCart(product.id));

        div.append(name, button);
        productList.appendChild(div);
    });
}

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.replaceChildren();

    state.cart.forEach((item) => {
        const product = state.products.find((p) => p.id === item.productId);
        if (!product) {
            return;
        }

        const div = document.createElement("div");
        div.className = "cart-item";

        const name = document.createElement("span");
        name.textContent = `${product.image} ${product.name}`;

        const quantity = document.createElement("input");
        quantity.type = "number";
        quantity.min = "1";
        quantity.value = item.quantity;
        quantity.setAttribute("aria-label", `Quantity for ${product.name}`);
        quantity.addEventListener("change", () => {
            updateQuantity(product.id, Number(quantity.value));
        });

        const remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.addEventListener("click", () => removeFromCart(product.id));

        div.append(name, quantity, remove);
        cartItems.appendChild(div);
    });

    document.getElementById("cart-count").textContent = getCartCount();
    document.getElementById("cart-total").textContent = getCartTotal();
}

document.getElementById("clear-cart").addEventListener("click", () => {
    state.cart = [];
    updateCart();
});

renderProducts();
renderCart();
