import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import NavbarCom from "../components/NavbarCom";
import { Button, Container, Form } from "react-bootstrap";

const Login = () => {
  const history = useHistory();
  const emailReference = useRef();
  const passwordReference = useRef();
  const Loginhandler = async (e) => {
    e.preventDefault();
    const logindata = {
      email: emailReference.current.value,
      password: passwordReference.current.value,
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        logindata,
        {
          timeout: 10000,
        }
      );
      const accesstokendata = response.data.accessToken;
      localStorage.setItem("accesstoken", accesstokendata);
      if (response.data.status === "success") {
        alert("Logged in successfully");
      }
      history.push("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown error occured! Try again.");
      }
    }
  };
  return (
    <>
      <NavbarCom />
      <Container className="mt-5">
        <form onSubmit={Loginhandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailReference}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              ref={passwordReference}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Login;
