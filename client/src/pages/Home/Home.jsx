import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link
import "./Home.css";
import HeroImage from '../../assets/hero-image.jpg';
import WorkoutsImage from '../../assets/workouts.jpg';
import RoutesImage from '../../assets/routes.png';
import CaloriesImage from '../../assets/calories.png';

const Home = () => {
    return (
        <>
          <div className="hero-section" style={{ backgroundImage: `url(${HeroImage})` }}>
            <h1 className="text-white">
              Your Fitness Starts <span className="gradient-text">Here</span>
            </h1>
          </div>
    
          <Container className="my-5">
            <Row xs={1} md={3} className="g-4">
              <Col>
                <Link to="/calories" className="custom-card-link">
                  <Card className='home-page-card'>
                    <Card.Img variant="top" className='custom-card-img' src={CaloriesImage} alt="Calories" />
                    <Card.Body>
                      <Card.Title>Calories</Card.Title>
                      <Card.Text>
                      Track your caloric intake effortlessly with our Calories Tracker. Log meals, monitor nutrition, and meet your dietary goals. Simplify your nutrition management and take control of your health journey.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col>
                <Link to="/routes" className="custom-card-link">
                  <Card className='home-page-card'>
                    <Card.Img variant="top" className='custom-card-img' src={RoutesImage} alt="Routes" />
                    <Card.Body>
                      <Card.Title>Routes</Card.Title>
                      <Card.Text>
                      Discover and plan your exercise routes with our Routes Planner. Ideal for runners and cyclists, map out your journeys, save favorite paths, and venture into new terrains. Turn every workout into an adventure.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col>
                <Link to="/workouts" className="custom-card-link">
                  <Card className='home-page-card'>
                    <Card.Img variant="top" className='custom-card-img' src={WorkoutsImage} alt="Workouts" />
                    <Card.Body>
                      <Card.Title>Workouts</Card.Title>
                      <Card.Text>
                      Enhance your fitness routine with our Workouts Tracker. Record exercises, track progress, and achieve your fitness objectives. Tailor your workouts to your goals and witness your transformation.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </Row>
          </Container>
        </>
    );
}

export default Home;
