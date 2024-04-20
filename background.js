chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    fetch('https://yourserver.com/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    }).then(response => response.json())
      .then(data => sendResponse(data))
      .catch(error => console.error('Error:', error));
    return true; // Keep the message channel open for the response
});
