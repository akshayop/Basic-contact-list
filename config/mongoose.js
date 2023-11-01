// requires library
const mongoose = require('mongoose');

// connct to the database
mongoose.connect('mongodb://127.0.0.1:27017/contact_list')
. then(() => {
    console.log('connection successfull');
}).catch( error => {
    console.log('not connected', error);
});

// acquire the connection (to check if it is successfull)
// const db = mongoose.connection;


// // if error
// db.on('error', console.error.bind(console, 'error connecting to db'));

// // if database is up and running then print the  msg
// db.once('open', function() {
//     console.log('Successfully connected to DB');
// });