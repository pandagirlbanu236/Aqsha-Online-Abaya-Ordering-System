// Cart Management System

// Initialize cart from localStorage or create empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
}

// Update cart icon with item count
function updateCartIcon() {
    const cartIcon = document.getElementById('cartIcon');
    const cartBadge = document.getElementById('cartBadge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartBadge) {
        if (totalItems > 0) {
            cartBadge.textContent = totalItems;
            cartBadge.style.display = 'block';
        } else {
            cartBadge.style.display = 'none';
        }
    }
}

// Add item to cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id && item.size === product.size);
    
    if (existingItem) {
        existingItem.quantity += product.quantity || 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: product.size || 'M',
            quantity: product.quantity || 1
        });
    }
    
    saveCart();
    showCartNotification('Item added to cart!');
    return false;
}

// Remove item from cart
function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    saveCart();
    displayCartItems();
    showCartNotification('Item removed from cart');
}

// Update item quantity
function updateQuantity(productId, size, change) {
    const item = cart.find(item => item.id === productId && item.size === size);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId, size);
        } else {
            saveCart();
            displayCartItems();
        }
    }
}

// Calculate total price
function calculateTotal() {
    return cart.reduce((total, item) => total + (parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity), 0);
}

// Display cart items on cart page
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Start shopping to add items to your cart</p>
                <a href="collection.html" class="btn">Browse Collections</a>
            </div>
        `;
        if (cartTotal) cartTotal.textContent = 'Rs 0';
        if (cartCount) cartCount.textContent = '0';
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map((item, index) => {
        const itemPrice = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        const itemTotal = itemPrice * item.quantity;
        
        return `
            <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-size">Size: ${item.size}</p>
                    <p class="cart-item-price">Rs ${itemPrice.toLocaleString()}</p>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity('${item.id}', '${item.size}', -1)" class="qty-btn">-</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button onclick="updateQuantity('${item.id}', '${item.size}', 1)" class="qty-btn">+</button>
                </div>
                <div class="cart-item-total">
                    <p>Rs ${itemTotal.toLocaleString()}</p>
                </div>
                <div class="cart-item-remove">
                    <button onclick="removeFromCart('${item.id}', '${item.size}')" class="remove-btn">×</button>
                </div>
            </div>
        `;
    }).join('');
    
    const total = calculateTotal();
    if (cartTotal) cartTotal.textContent = `Rs ${total.toLocaleString()}`;
    if (cartCount) cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0).toString();
}

// Show notification
function showCartNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.cart-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Initialize cart icon on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartIcon();
    
    // Display cart items if on cart page
    if (document.getElementById('cartItems')) {
        displayCartItems();
    }
});

// Make functions available globally
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.displayCartItems = displayCartItems;


