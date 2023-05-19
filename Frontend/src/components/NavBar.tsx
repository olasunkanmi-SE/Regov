import { Container, Nav, NavDropdown, Navbar, Stack } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

export const NavBar = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Events</Navbar.Brand>
          <Nav className="me-auto"></Nav>
          <Stack gap={3} direction="horizontal">
            <Nav.Link to="/register" className="ms-auto" href="#home" as={NavLink}>
              Register
            </Nav.Link>
            <Nav.Link to="/login" as={NavLink}>
              Sign In
            </Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="">Info</NavDropdown.Item>
              <NavDropdown.Item href="">Reviews</NavDropdown.Item>
            </NavDropdown>
          </Stack>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};
