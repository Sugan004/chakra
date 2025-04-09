const express = require('express');
const path = require('path');
const cors = require('cors');
const userController = require('./controllers/userController');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS
app.use(express.static(path.join(__dirname, 'public')));

// CRUD Routes
app.post('/users', userController.createUser);
app.get('/users', userController.getUsers);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

module.exports = app;