import { Col, Container, Row } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { AuthProvider } from "./contexts/AuthContext";
import { Event } from "./pages/Event";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <div>
        <Container>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <Routes>
                <Route path="/" element={<NavBar />}>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/events" element={<Event />} />
                  <Route path="*" element={<Navigate to=".." />} />
                </Route>
              </Routes>
            </Col>
            <Col md={3}></Col>
          </Row>
        </Container>
      </div>
    </AuthProvider>
  );
}

export default App;
