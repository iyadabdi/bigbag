// Declaration of 'db' for database operations
let db;

// Function to handle the addition of a new product to the database
function addProduct(productDetails) {
  const transaction = db.transaction(['products'], 'readwrite');
  const objectStore = transaction.objectStore('products');
  const request = objectStore.add(productDetails);
  
  request.onsuccess = function() {
    console.log('Product added to the database:', productDetails);
    displayProducts(); // Refresh the displayed products
  };

  request.onerror = function(event) {
    console.error('Error adding product to the database:', event.target.errorCode);
  };
}

// Function to display products from the database in the popup
function displayProducts() {
  const objectStore = db.transaction('products').objectStore('products');
  document.getElementById('product-list').innerHTML = ''; // Clear the list first

  objectStore.openCursor().onsuccess = function(event) {
    const cursor = event.target.result;
    if (cursor) {
      const product = cursor.value;
      const productElement = document.createElement('div');
      productElement.innerHTML = `<p>${product.name} - ${product.url}</p>`;
      document.getElementById('product-list').appendChild(productElement);
      cursor.continue();
    } else {
      console.log('No more products!');
    }
  };
}

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "addProduct") {
    addProduct(request.data);
  }
});

// Add listener to the 'Add Item' button
document.getElementById('add-item').addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "getProductDetails"}, function(response) {
      if (response) {
        addProduct(response);
      }
    });
  });
});

// Initialize and open the database connection when the popup is loaded
document.addEventListener('DOMContentLoaded', function() {
  const request = indexedDB.open('MyBagDB', 1);

  request.onsuccess = function(event) {
    db = event.target.result;
    displayProducts(); // Display products after connecting to the database
  };

  request.onerror = function(event) {
    console.error('Error opening IndexedDB:', event.target.errorCode);
  };
});
