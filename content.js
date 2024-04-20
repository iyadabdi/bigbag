document.addEventListener('DOMContentLoaded', function() {
    const productInfo = {
        name: document.querySelector('h1').innerText,
        price: document.querySelector('.price').innerText,
        url: window.location.href
    };
    chrome.runtime.sendMessage(productInfo);
});
