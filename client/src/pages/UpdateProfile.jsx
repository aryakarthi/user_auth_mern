import { Button, Form } from "react-bootstrap";
import { FormContainer } from "../components";

const UpdateProfile = () => {
  return (
    <FormContainer>
      <h1 className="text-center fw-bold mb-3 text-primary">Update</h1>
      <Form>
        <Form.Group className="my-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" />
        </Form.Group>

        <Form.Group className="my-3" controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" placeholder="Enter new password" />
        </Form.Group>

        <Form.Group className="my-3" controlId="confirm-password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Enter confirm password" />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UpdateProfile;
