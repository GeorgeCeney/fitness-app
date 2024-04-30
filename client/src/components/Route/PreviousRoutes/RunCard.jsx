import { ListGroup, Card, Button, Table } from "react-bootstrap";

const RunCard = (props) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Subtitle>{props.createdAt}</Card.Subtitle>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default RunCard;