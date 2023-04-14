import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const MovieCard = (props) => {
  return (
    <>
      <Col>
        <div key={props.data.id}>
          <Card
            style={{ width: "18rem", height: "600px" }}
            className="me-5 ms-5 mb-5"
          >
            <Card.Img variant="top" src={props.data.image} />
            <Card.Body>
              <Card.Title>{props.data.name}</Card.Title>
              <Card.Text>Ratings: {props.data.rating}</Card.Text>
            </Card.Body>

            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/view_movie/${props.data.id}`}
            >
              <Button className="ms-5 mb-3" variant="primary">
                See more ...
              </Button>
            </Link>
          </Card>
        </div>
      </Col>
    </>
  );
};
export default MovieCard;
