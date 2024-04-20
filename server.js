const express = require('express');
const sequelize = require('./database'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 3000;

// Set up a simple route to respond to GET requests on the root path
app.get('/', (req, res) => {
    res.send('Hello World!');  // This will send "Hello World!" to the browser
});

// Authenticate with the database
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        // Optional: Sync models
        sequelize.sync().then(() => {
            console.log('Database synced successfully.');
            // Start the server only after the database connection and model sync
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        }).catch(err => {
            console.error('Error syncing database:', err);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const db = require('./models'); // Assuming your Sequelize initialization code is in ./models/index.js

db.sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronized successfully.');
}).catch(err => {
  console.error('Error synchronizing database:', err);
});

    