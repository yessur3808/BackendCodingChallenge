// DEPENDENCIES
let cors = require('cors');
// Import express server for Node
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');

// Import Mongoose for a later version of the API for a noSQL solution
/*  
let mongoose = require('mongoose');
*/

// connect to the database via mongoose and set the connection variable
/* 
mongoose.connect('mongodb://localhost/testdb',{
   useNewUrlParser: true,
   useUnifiedTopology: true
}); 
*/

// Initialize the app
let app = express();

// Import routes
let apiRoutes = require("./routes/api-routes")

app.use(express.json({ limit: '300mb' }));
app.use(express.urlencoded({ limit: '300mb', extended: true }));

// Remove Cors Policy Issue
app.use(cors());

// Setup server port
var port = process.env.port || 3030;

// Send message for default URL
app.get('/test', (req, res) => res.json({
    status: 'The API is Working',
    message: 'Welcome to PlayStudios!'
}));

// Use Api routes in the App
app.use('/api', apiRoutes)

// Launch the app to listen to the specified port
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)
});