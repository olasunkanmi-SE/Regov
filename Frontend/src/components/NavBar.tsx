import { Container, Nav, NavDropdown, Navbar, Stack } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const NavBar = () => {
  const { isAuthenticated, currentUser } = useAuth();
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand to="/" as={NavLink}>
            Events
          </Navbar.Brand>
          <Nav className="me-auto"></Nav>
          <Stack gap={3} direction="horizontal">
            {!isAuthenticated ? (
              <Nav.Link to="/register" className="ms-auto" href="#home" as={NavLink}>
                Register
              </Nav.Link>
            ) : (
              ""
            )}
            {!isAuthenticated ? (
              <Nav.Link to="/login" as={NavLink}>
                Sign In
              </Nav.Link>
            ) : (
              ""
            )}
            {isAuthenticated ? (
              <NavDropdown title={currentUser?.userName} id="basic-nav-dropdown">
                <NavDropdown.Item href="">Profile</NavDropdown.Item>
                <NavDropdown.Item href="">Events</NavDropdown.Item>
                <NavDropdown.Item href="">Review</NavDropdown.Item>
              </NavDropdown>
            ) : (
              ""
            )}
          </Stack>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};
