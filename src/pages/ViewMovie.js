/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import NavbarCom from "../components/NavbarCom";
import { Card, Container } from "react-bootstrap";

const ViewMovie = () => {
  const getParams = useParams();
  const getID = getParams.id;
  const [detailMovie, setDetailMovie] = useState({});
  useEffect(() => {
    newdata();
  }, []);
  const newdata = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getID}`
      );
      setDetailMovie(response.data.singleMovieData);
    } catch (error) {
      alert("error occured");
    }
  };
  return (
    <>
      <NavbarCom />
      <Container>
        <Card
          className="position-absolute top-50 start-50 translate-middle"
          style={{ marginTop: "120px", alignItems: "center", width: "50rem" }}
        >
          <Card.Title>
            <h2>{detailMovie.name}</h2>
          </Card.Title>
          <Card.Img
            style={{ width: "18rem" }}
            variant="top"
            src={detailMovie.image}
          />
          <Card.Body>
            <h4>Info:</h4>
            <Card.Text> {detailMovie.info}</Card.Text>
            <h4>Ratings:</h4>
            <Card.Text> {detailMovie.rating}</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
export default ViewMovie;
