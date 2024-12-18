const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'your_secret_key'; // Use an environment variable for production
const db = require('../db/connection');
const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(500).json("you have to provide username , email and password");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    db.all(query, [username, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        const token = jwt.sign({ userId: result.insertId }, SECRET_KEY, { expiresIn: '360h' });
        res.status(201).json({ token });
    });
};

const login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(502).json("email and password are required")
    }
    const query = `SELECT * FROM users WHERE email = ?`;
    db.all(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        console.log({ results })
        if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const user = results[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        console.log(isValidPassword);
        if (!isValidPassword) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '20h' });
        res.status(200).json({ token });
    });
};

module.exports = { register, login }