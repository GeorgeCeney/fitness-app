const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Fitness App API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});