import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { Form, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FormContainer } from "../components";
import { useRegisterAPIMutation } from "../store/slices/userApiSlice";
import { login } from "../store/slices/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerAPI, {isLoading}] = useRegisterAPIMutation();
  const toastId = useRef(null);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerHandler = async (e) => {
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
      try {
        const response = await registerAPI({ name, email, password }).unwrap();
        dispatch(login({ ...response }));
        navigate("/profile");
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [navigate, isLoggedIn]);

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
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}Loading..
            </>
          ) : (
            "Register"
          )}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Register;
