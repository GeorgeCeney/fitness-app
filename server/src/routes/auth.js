const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../database/db');
require('dotenv').config();

const router = express.Router();
const secret = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Check if user exists
      const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (userExists.rows.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Insert new user
      const newUser = await pool.query(
        'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
        [email, hashedPassword]
      );
  
      // Generate a token
      const token = jwt.sign({ user_id: newUser.rows[0].user_id }, secret, { expiresIn: '1h' });
  
      res.status(201).json({ token }); // Send the token to the client
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (user.rows.length === 0) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Check password
      const isValid = await bcrypt.compare(password, user.rows[0].password_hash);
      if (!isValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Generate token
      const token = jwt.sign({ user_id: user.rows[0].user_id }, secret, { expiresIn: '1h' });
  
      res.json({ token }); // Send the token to the client
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
});

module.exports = router;
