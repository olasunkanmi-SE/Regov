import { Col, Container, Row } from "react-bootstrap";
import { NavBar } from "./components/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

function App() {
  return (
    <>
      <div>
        <Container>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <Routes>
                <Route path="/" element={<NavBar />}>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<Navigate to=".." />} />
                </Route>
              </Routes>
            </Col>
            <Col md={3}></Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default App;
