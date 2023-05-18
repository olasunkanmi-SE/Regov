import { Button, Container, Nav, NavDropdown, Navbar, Stack } from "react-bootstrap";

export const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Events</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Stack gap={3} direction="horizontal">
            <Nav.Link className="ms-auto" href="#home">
              Register
            </Nav.Link>
            <Nav.Link href="#link">Sign In</Nav.Link>
          </Stack>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
