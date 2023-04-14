/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NavbarCom from "../components/NavbarCom";
import { Button, Container, Modal } from "react-bootstrap";

const Profile = () => {
  const history = useHistory();
  const [userprofile, setUserprofile] = useState({});
  const [modalShown, setModalShown] = useState(false);
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    const accessToken = localStorage.getItem("accesstoken");
    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",
        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUserprofile(response.data.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
        history.push("/login");
      } else {
        alert("Unknown error!! PLease try Again.");
      }
    }
  };
  const logoutsubmit = () => {
    setModalShown(true);
  };
  return (
    <>
      <NavbarCom />
      <Container>
        Name: {userprofile.name}
        <br />
        <br />
        Email: {userprofile.email}
        <br />
        <br />
        Country: {userprofile.country}
        <br />
        <br />
        <Button variant="danger" onClick={logoutsubmit} type="submit">
          logout
        </Button>
      </Container>
      <Modal
        size="sm"
        show={modalShown}
        onHide={() => setModalShown(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Are you sure you want to logout?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModalShown(false);
            }}
          >
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              localStorage.removeItem("accesstoken");
              history.push("/login");
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Profile;
