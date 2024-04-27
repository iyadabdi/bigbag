// The products array doesn't seem to be used, so you can remove it if you're not using it for testing
let db;

// Function to create or upgrade the database
function createDatabase() {
    const request = indexedDB.open('MyBagDB', 1);

    request.onerror = function(event) {
        console.error('Error opening database:', event.target.errorCode);
    };

    request.onupgradeneeded = function(event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains('products')) {
            let objectStore = db.createObjectStore('products', { keyPath: 'id', autoIncrement: true });
            // Create indexes if necessary, for example:
            // objectStore.createIndex('name', 'name', { unique: false });
            console.log('Object store created.');
        }
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log('Database opened successfully.');
        // You can now interact with the database
        // For example, insert initial records if needed
        // insertRecords(products); // Make sure this function is defined properly
    };
}

// Function to insert records into the database
function insertRecords(records) {
    if (db) {
        const insertTransaction = db.transaction('products', 'readwrite');
        const objectStore = insertTransaction.objectStore('products');
        records.forEach((product) => {
            objectStore.add(product);
        });

        insertTransaction.oncomplete = function() {
            console.log('All records have been added to the database.');
        };

        insertTransaction.onerror = function(event) {
            console.error('Error adding records to the database:', event.target.errorCode);
        };
    } else {
        console.error('Database has not been initialized.');
    }
}

// Function to delete the database
function deleteDatabase() {
    const request = indexedDB.deleteDatabase('MyBagDB');

    request.onerror = function(event) {
        console.error('Error deleting database:', event.target.errorCode);
    };

    request.onsuccess = function(event) {
        console.log('Database deleted successfully.');
        // After deleting the database, you would typically not immediately insert records
        // Instead, you might want to reset the UI or internal variables
        // createDatabase(); // You could call createDatabase here if you want to recreate it
    };
}

// When the extension is installed, create the database
chrome.runtime.onInstalled.addListener(function() {
    createDatabase();
});
