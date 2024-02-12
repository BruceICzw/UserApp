const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express();
const PORT = 3000;

// Connect to MongoDB

mongoose.connect('mongodb://localhost/userDB', {
    useNewUrlParser: true, useUnifiedTopology: true
});

// Create user schema and Model
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true, }));
app.use(express.static('frontend'));


// Register user

app.post('/register', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
    });

    newUser.save((err) => {
        if (err) {
            res.send('Error registering User');

        }
        else {
            res.send('User registered successfully');
        }
    });
});

// Login User
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username, password: password }, (err, foundUser) => {
        if (err) {
            res.send("Error Logging In");
        }
        else {
            if (foundUser) {
                res.send("Login Successfully");
            }
            else {
                res.send('Invalid Username and password')
            }
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});