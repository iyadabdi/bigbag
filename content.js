// Utility function to extract the product name from the URL
function getProductNameFromURL() {
    const productNameSlug = window.location.pathname.split('/').pop().split('.')[0];
    const productName = productNameSlug.replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return productName;
  }
  
  // Function to attempt to find the main product image
  function getMainImageUrl() {
    let imageElement = document.querySelector('.product-image-mosaic__grid__item img');
    if (!imageElement) {
      imageElement = document.querySelector('meta[property="og:image"]');
      return imageElement ? imageElement.content : null;
    }
    return imageElement ? imageElement.src : null;
  }
  
  // Function to attempt to find the product price
  function getProductPrice() {
    // You will need to modify the selector to match the structure of the webpage
    const priceElement = document.querySelector('.price-box .price-wrapper .price');
    return priceElement ? priceElement.innerText.trim() : 'No price found';
  }
  
  // Main function to get the product details
  function getProductDetails() {
    const productUrl = window.location.href;
    const name = getProductNameFromURL();
    const imageUrl = getMainImageUrl();
    const price = getProductPrice();
  
    return {
      name,
      imageUrl,
      price,
      productUrl
    };
  }
  
  // Listener for the message from the popup or background script
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getProductDetails") {
      const details = getProductDetails();
      sendResponse(details);
    }
    return true; // Return true to indicate an asynchronous response
  });
  