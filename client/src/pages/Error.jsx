import { Container, Row, Col, Button } from "react-bootstrap";
import { NavBar } from "../components";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6} className="card p-4 text-center">
            <p className="display-6 mb-4">Oops! Something went wrong!</p>
            <p>The page you requested is not found - 404 error!</p>
            <Link to={"/"}>Back to Home</Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Error;
