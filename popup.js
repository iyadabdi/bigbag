document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const productUrl = document.getElementById('productUrl').value;

    // Example of adding to display; adjust according to your actual data handling
    const productContainer = document.createElement('div');
    productContainer.textContent = `${productName} - ${productUrl}`;
    document.getElementById('productList').appendChild(productContainer);

    // Reset form
    document.getElementById('productName').value = '';
    document.getElementById('productUrl').value = '';
});
