import { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from "../../AuthContext/AuthContext";
import { ListGroup, Card, Button, Table, Container } from "react-bootstrap";
import { Grid } from "@mui/material";
import RunCard from "./RunCard";

const backendUrl = "http://localhost:3001/routes";

const PreviousRoutes = () => {
    const { token } = useAuth();
    const [previousRuns, setPreviousRuns] = useState([])

    useEffect(() => {
        const fetchRunData = async () => {
            const response = await axios.get(`${backendUrl}/previous-routes`, {
                headers: {
                  Authorization: `${token}`,
                },
            });
            console.log('Previous Routes:', response.data.results);
            return response.data.results
        }
        fetchRunData().then(setPreviousRuns);
    }, []);

    if (previousRuns.length > 0) {
        return (
            <Container>
                <Grid className="my-4" justifyContent="space-evenly" container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {previousRuns.map((run) => (
                        <Grid item>
                            <RunCard 
                                name={run.run_name}
                                createdAt={run.created_at}
                                routeImage={run.route_image}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        )
    } else {
        return (
            <p>No previous runs: no runs have been saved on your account</p>
        )
    }

    
};
export default PreviousRoutes;