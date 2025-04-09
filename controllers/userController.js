const mydb = require('../config/db');

const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

// CREATE User
const createUser = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and Email are required' });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid Email' });
    }

    mydb.execute('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating user' });
        }
        res.status(201).json({ id: result.insertId, name, email });
    });
};

// READ Users
const getUsers = (req, res) => {
    mydb.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving users' });
        }
        res.status(200).json(results);
    });
};

// UPDATE User
const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Name and Email are required' });
    }

    mydb.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedName = name || results[0].name;
        const updatedEmail = email || results[0].email;

        mydb.execute('UPDATE users SET name = ?, email = ? WHERE id = ?',
            [updatedName, updatedEmail, id],
            (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error updating user' });
                }
                res.status(200).json({ id, name: updatedName, email: updatedEmail });
            });
    });
};

// DELETE User
const deleteUser = (req, res) => {
    const { id } = req.params;
    mydb.execute('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err || results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send();
    });
};

module.exports = { createUser, getUsers, updateUser, deleteUser };
