const express = require('express');
const axios = require('axios');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
require('dotenv').config();

const options = {
  method: 'GET',
  url: 'https://work-out-api1.p.rapidapi.com/search',
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'work-out-api1.p.rapidapi.com'
  }
};

router.get('/', verifyToken, async (req, res) => {
  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching exercises from external API:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
