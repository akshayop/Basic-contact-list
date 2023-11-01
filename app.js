const { log } = require('console');
const { render } = require('ejs');
const express = require('express');
const path = require('path');
const port = 3000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());

app.use(express.static('assets'));

// middleware 1

// app.use(function(req, res, next ) {
//     console.log('middleware 1 called');
//     next();
// });

// middleware 2

// app.use(function(req, res, next) {
//     console.log("middleware 2 called");
//     next();
// });

var contactList = [
    {
        name: "Akshay",
        phoneNo: "1234567891"
    },
    {
        name: "Sam",
        phoneNo: "1111111112"
    },
    {
        name: "Jack",
        phoneNo: "1212121212"
    }
]

app.get('/', function(req, res) {
    // res.send('<h1>Its running</h1>');

    // Contact.find({}, function(err, contactList) {
    //     if(err) {
    //         console.log("error while fetching data from db");
    //         return;
    //     }

    //     return res.render('home', {
    //         title: "My Contact List",
    //         contact_list: contactList
    //     });
    // });

    Contact.find({}).then((contactList) => {
        return res.render('home', {
            title: "My Contact List",
            contact_list: contactList
        });
    }).catch((err) => {
        console.log("error while fetching data from db");
        return;
    });
});

app.post('/create-contact', function(req, res) {
    // contactList.push({
    //     name: req.body.name,
    //     phoneNo: req.body.phoneNo
    // });

    // return res.redirect('/')

    // Shortest way to write it

    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phoneNo: req.body.phoneNo
    }).then((Contact) => {
        console.log('************', Contact);
        return res.redirect('back');
    }).catch((err) => {
        console.log('error while creating a contact', err);
    });   
});


        

app.get('/delete-contact', function(req, res) {
    console.log(req.query);

    // get the id from the query in the url
    let id = req.query.id;

    // find the contact in the db using id and  deleting it 
    
    Contact.findByIdAndDelete(id)
        .then(() => {
            console.log("deleted", id);
            return res.redirect('back');
        }).catch(() => {
            console.log("error while deleting the data from db")
        });  
});

app.listen(port, function(err) {
    if(err) {
        console.log("Error", err)
        return;
    }

    console.log("Running successfully on port: ", port)
});