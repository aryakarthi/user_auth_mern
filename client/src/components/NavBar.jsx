import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const logoutHandler = () => {};
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            logo
          </Link>

          <Nav className="ms-auto">
            {isLoggedIn ? (
              <>
                <NavDropdown title="Arya" id="username">
                  <Nav.Link as={Link} to={"/profile"}>
                    Profile
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    onClick={() => logoutHandler}
                  >
                    Logout
                  </Nav.Link>
                </NavDropdown>
              </>
            ) : (
              <>
                <NavLink
                  to={"/login"}
                  className={({ isActive }) =>
                    isActive ? "nav-link active bg-primary" : "nav-link"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to={"/register"}
                  className={({ isActive }) =>
                    isActive ? "nav-link active bg-primary" : "nav-link"
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
