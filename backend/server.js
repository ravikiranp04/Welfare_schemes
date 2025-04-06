const exp = require("express");
const app = exp();
const path = require('path');
const cors = require("cors");

const userApp = require('./APIs/userAPI');
const adminApp = require('./APIs/adminAPI');

require('dotenv').config();

app.use(cors());

// Add body parser middleware
app.use(exp.json());

// Route API requests
app.use('/user-api', userApp);
app.use('/admin-api', adminApp);

app.use(exp.static(path.join(__dirname, '../frontend/build')));

// MongoDB connection
const mongoClient = require('mongodb').MongoClient;

mongoClient.connect(process.env.DB_URL)
    .then(client => {
        const welfareDBObj = client.db('welfare');
        const welfareCollection = welfareDBObj.collection('welfare_data');
        const centralCollection = welfareDBObj.collection('central_schemes');
        const statesCollection = welfareDBObj.collection('states'); // ✅ Fixed
        const usersCollection= welfareDBObj.collection('users')
        // Attach to app for reuse in routes
        app.set('welfareCollection', welfareCollection);
        app.set('centralCollection', centralCollection);
        app.set('statesCollection', statesCollection);
        app.set('usersCollection',usersCollection)
        console.log('DB connection success');
    })
    .catch(err => {
        console.log("Error in DB connect", err);
    });

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
