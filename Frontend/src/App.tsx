import { Col, Container, Row } from "react-bootstrap";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { AuthProvider } from "./contexts/AuthContext";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Event } from "./pages/Event";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const redirectTimeout = setTimeout(() => {
        navigate("/events");
      }, 500);
      return () => clearTimeout(redirectTimeout);
    }
  }, [navigate]);
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
