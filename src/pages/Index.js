/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import NavbarCom from "../components/NavbarCom";
import MovieCard from "../components/MovieCard";
import { Container, Form, Row } from "react-bootstrap";

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [firstload, setFirstload] = useState(true);
  const [searcherrorText, setSearchErrorText] = useState(false);
  const [searchMovie, setSearchMovie] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchMovies();
  }, []);
  useEffect(() => {
    if (!firstload) {
      const fetchtimer = setTimeout(() => {
        if (searchMovie && searchMovie.length > 2) {
          fetchMovies();
          setSearchErrorText("");
        } else if (searchMovie.length < 1) {
          fetchMovies();
          setSearchErrorText("");
        } else if (searchMovie.length > 0 && searchMovie.length < 3) {
          setSearchErrorText("Please enter atleast 3 character to search");
        }
      }, 800);
      return () => {
        clearTimeout(fetchtimer);
      };
    }
  }, [searchMovie]);
  const fetchMovies = async () => {
    setLoading(true);
    setIsError(false);
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchMovie}`
      );
      setLoading(false);
      setMovies(response.data.moviesData);
      setFirstload(false);
    } catch (error) {
      setIsError(true);
      setErrorText("Cannot get movie info!");
    }
    //Promise way to make sychronous
    // const promise = new Promise((resolve, reject) => {
    //   const response = axios.get(
    //     "https://api.dynoacademy.com/test-api/v1/movies"
    //   );
    //   resolve(response);
    // });
    // promise
    //   .then((result) => {
    //     console.log(result);
    //     console.log("Finish");
    //   })
    //   .catch((error) => {});
  };

  return (
    <>
      <NavbarCom />
      <Container>
        <div className="mt-3">
          <Form.Control
            value={searchMovie}
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearchMovie(e.target.value);
            }}
          />
          <br />
          <span style={{ color: "red" }}>{searcherrorText}</span>
        </div>
      </Container>

      {loading ? (
        <>Loading...</>
      ) : (
        <>
          {isError ? (
            <>
              <div
                style={{
                  background: "red",
                  color: "fff",
                  padding: "10px",
                  margin: "10px",
                }}
              >
                {errorText}
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  background: "#e7e7e7",
                  padding: "10px",
                  margin: "0 2px 0 0px",
                }}
                className="bg-dark bg-gradient"
              >
                {movies.length < 1 ? (
                  <>No Result Found!!</>
                ) : (
                  <>
                    <Row>
                      {movies.map((e1) => (
                        <MovieCard data={e1} />
                      ))}
                    </Row>
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
export default Index;
