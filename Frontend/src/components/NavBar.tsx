import { Container, Nav, NavDropdown, Navbar, Stack } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const NavBar = () => {
  const { isAuthenticated, currentUser, logOut } = useAuth();
  const handleLogOut = () => {
    return logOut();
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand to="/events" as={NavLink}>
            Events
          </Navbar.Brand>
          <Nav className="me-auto"></Nav>
          <Stack gap={3} direction="horizontal">
            <Nav.Link to="/events/drafts" as={NavLink}>
              Drafts
            </Nav.Link>
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
                <NavDropdown.Item href="">Events</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogOut}>Log out</NavDropdown.Item>
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
