const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const workoutRoutes = require('./routes/workouts');
const exercisesRoutes = require('./routes/exercises');
const caloriesRoutes = require('./routes/calories');
const routesRoutes = require('./routes/routes');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/workouts', workoutRoutes);
app.use('/exercises', exercisesRoutes);
app.use('/routes', routesRoutes);
app.use('/calories', caloriesRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));