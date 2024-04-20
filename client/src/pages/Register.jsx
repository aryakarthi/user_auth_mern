import { useState, useRef } from "react";
import { toast } from "react-toastify";

import { FormContainer } from "../components";
import { Form, Button } from "react-bootstrap";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastId = useRef(null);

  const registerHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("All fields are required!");
      }
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password are must be same!");
    } else {
      console.log(`${name} -${email} - ${password}- ${confirmPassword}`);
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center fw-bold mb-3 text-primary">Register</h1>
      <Form>
        <Form.Group className="my-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-3" controlId="confirm-password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          onClick={registerHandler}
        >
          Register
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Register;
