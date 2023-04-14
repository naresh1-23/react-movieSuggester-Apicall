import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarCom = () => {
  return (
    <>
      <Navbar className="bg-dark">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="text-white">
              Movie Suggester
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end gap-5">
            <Navbar.Text>
              <Link to="/addmovies" className="text-white">
                Add movies
              </Link>
            </Navbar.Text>

            {localStorage.getItem("accesstoken") ? (
              <>
                <Navbar.Text>
                  <Link to="/profile" className="text-white">
                    Profile
                  </Link>
                </Navbar.Text>
              </>
            ) : (
              <>
                <Navbar.Text>
                  <Link to="/login" className="text-white">
                    Login
                  </Link>
                </Navbar.Text>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default NavbarCom;
