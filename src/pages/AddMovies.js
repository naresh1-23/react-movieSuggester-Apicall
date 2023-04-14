import axios from "axios";
import { useRef } from "react";
import NavbarCom from "../components/NavbarCom";
import { Button, Container, Form } from "react-bootstrap";

const AddMovies = () => {
  const Moviename_reference = useRef();
  const MovieRating_reference = useRef();
  const MovieDescription_reference = useRef();
  const submitForm = async (e) => {
    e.preventDefault();

    const MovieData = {
      movie_name: Moviename_reference.current.value,
      rating: MovieRating_reference.current.value,
      description: MovieDescription_reference.current.value,
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        MovieData,
        {
          timeout: 10000,
        }
      );
      alert(response.data.message);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Something occured. Please try again!!");
      }
    }
  };
  return (
    <>
      <NavbarCom />
      <br />
      <Container>
        <h1>Add Movies:</h1>
        <div>
          <form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Movie name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Movie Name"
                ref={Moviename_reference}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ratings</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Ratings"
                ref={MovieRating_reference}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Description"
                ref={MovieDescription_reference}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Movie
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};
export default AddMovies;
