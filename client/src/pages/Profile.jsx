import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { userData } = useSelector((state) => state.auth);

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6} className="card p-4 text-center">
          <h2 className="display-5 fw-semibold mb-3">
            Welcome {userData?.name}!
          </h2>
          <Link to={"/updateprofile"}>
            <Button className="bg-primary border-primary rounded-pill">
              Update Profile
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
