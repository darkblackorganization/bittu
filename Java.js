const botToken = '7041115900:AAHtHncvWaZAE1ED4S9XIChdfTOqP95BT4c';
const chatId = '6100927257';

const cart = [];

function addToCart(item, productId, price) {
    cart.push({ item, productId, price });
    updateCart();
    document.getElementById(productId).querySelector('button').innerText = "Added";
    document.getElementById(productId).querySelector('button').disabled = true;
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;
    cartItems.innerHTML = '';
    cart.forEach(cartItem => {
        const li = document.createElement('li');
        li.textContent = `${cartItem.item} - $${cartItem.price.toFixed(2)}`;
        cartItems.appendChild(li);
        total += cartItem.price;
    });
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const data = {
        chat_id: chatId,
        text: message,
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function checkout() {
    const items = cart.map(item => `${item.item} - $${item.price.toFixed(2)}`).join('\n');
    const total = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);
    const message = `Checkout - Items:\n${items}\nTotal: $${total}`;
    sendToTelegram(message);

    alert('Proceeding to checkout!');
    cart.length = 0; // Clear the cart
    updateCart();
    document.querySelectorAll('.product button').forEach(button => {
        button.innerText = "Add to Cart";
        button.disabled = false;
    });
    
    
function checkout() {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    setupPayPalButton(total);
}

}

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const fullMessage = `Contact Us - Name: ${name}, Email: ${email}, Message: ${message}`;
    sendToTelegram(fullMessage);

    alert('Form submitted successfully!');
    this.reset();
});