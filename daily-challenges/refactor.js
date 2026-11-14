// DAY 4: REFACTOR CHALLENGE

const DISCOUNT_THRESHOLD = 100;
const DISCOUNT_RATE = 0.1;

export function calculateOrderTotal(items) {
    if (!Array.isArray(items)) {
        throw new TypeError("Items must be an array.");
    }

    const subtotal = items.reduce((total, item) => {
        if (
            typeof item.price !== "number" ||
            typeof item.quantity !== "number" ||
            item.price < 0 ||
            item.quantity < 0
        ) {
            throw new Error("Invalid product information.");
        }

        return total + item.price * item.quantity;
    }, 0);

    return subtotal > DISCOUNT_THRESHOLD ? subtotal * (1 - DISCOUNT_RATE) : subtotal;
}

const order = [
    { name: "Book", price: 15, quantity: 2 },
    { name: "Pen", price: 3, quantity: 5 },
    { name: "Notebook", price: 8, quantity: 3 },
];

console.log("Order total:", calculateOrderTotal(order));
