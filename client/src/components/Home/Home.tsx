import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import './Home.css';
import HeroImage from '../../assets/hero-image.jpg'

const Home = () => {
    return (
        <>
          {/* Hero Image Section */}
          <div
            className="hero-section"
            style={{ backgroundImage: `url(${HeroImage})` }}
          >
            <div className="hero-text">
              <Typography variant="h2" component="h1">
                Your Fitness Starts Here
              </Typography>
            </div>
          </div>
    
          {/* Cards Section */}
          <div className="cards-container">
            <div className="card-item">
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image="/path-to-calories-image.jpg" // Path to your image
                  alt="Calories"
                />
                <CardContent className="card-content">
                  <Typography gutterBottom variant="h5" component="div">
                    Calories
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Record meals and calorie macros.
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <div className="card-item">
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image="/path-to-routes-image.jpg" // Path to your image
                  alt="Routes"
                />
                <CardContent className="card-content">
                  <Typography gutterBottom variant="h5" component="div">
                    Routes
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Plan and view your exercise routes.
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <div className="card-item">
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image="/path-to-workouts-image.jpg" // Path to your image
                  alt="Workouts"
                />
                <CardContent className="card-content">
                  <Typography gutterBottom variant="h5" component="div">
                    Workouts
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Customize your workout routines and track your progress.
                  </Typography>
                </CardContent>
              </Card>
            </div>    
          </div>
        </>
      );
}

export default Home;