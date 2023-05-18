import { Col, Container } from "react-bootstrap";
import { NavBar } from "./components/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Container fluid="md">
          <section className="h-100 d-flex align-items-center justify-content-center">
            <Col className="mb-3 ">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <NavBar />
                    </>
                  }
                >
                  <Route path="*" element={<Navigate to=".." />} />
                </Route>
              </Routes>
            </Col>
          </section>
        </Container>
      </div>
    </>
  );
}

export default App;
