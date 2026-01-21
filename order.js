// Handle order form submission
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get all form values
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const abaya = document.getElementById('abaya').value;
    const size = document.getElementById('size').value;
    const address = document.getElementById('address').value;
    
    // Generate unique order ID
    const orderId = 'ORD-' + Date.now();
    
    // Populate confirmation modal with all order details
    document.getElementById('orderId').textContent = orderId;
    document.getElementById('confirmName').textContent = name;
    document.getElementById('confirmEmail').textContent = email;
    document.getElementById('confirmPhone').textContent = phone;
    document.getElementById('confirmAbaya').textContent = abaya;
    document.getElementById('confirmSize').textContent = size;
    document.getElementById('confirmAddress').textContent = address;
    
    // Show confirmation modal
    showOrderConfirmation();
    
    // Reset form after showing confirmation
    this.reset();
});

// Show order confirmation modal
function showOrderConfirmation() {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'block';
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'none';
}

// Close modal when clicking the X button
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside of it
    window.onclick = function(event) {
        const modal = document.getElementById('confirmationModal');
        if (event.target == modal) {
            closeModal();
        }
    }
});

