import { Form, Button } from "react-bootstrap";
import { FormContainer } from "../components";
import { useState, useRef } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toastId = useRef(null);

  const loginHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Email and Password must be provided!");
      }
      return;
    }
    console.log(`${email} - ${password}`);
  };

  return (
    <FormContainer>
      <h1 className="text-center fw-bold mb-3 text-primary">Login</h1>
      <Form>
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

        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          onClick={loginHandler}
        >
          Login
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Login;
