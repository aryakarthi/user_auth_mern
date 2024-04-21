import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { logout } from "../store/slices/authSlice";
import { useLogoutAPIMutation } from "../store/slices/userApiSlice";

const NavBar = () => {
  const { isLoggedIn, userData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutAPI] = useLogoutAPIMutation();

  const logoutHandler = async () => {
    try {
      await logoutAPI().unwrap();
      dispatch(logout());
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || error?.error);
    }
  };
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
                <NavDropdown title={userData?.name} id="username">
                  <Nav.Link as={Link} to={"/profile"}>
                    Profile
                  </Nav.Link>
                  <Nav.Link as={Link} onClick={logoutHandler}>
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
