import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { FormContainer } from "../components";
import { useUpdateProfileAPIMutation } from "../store/slices/userApiSlice";
import { login } from "../store/slices/authSlice";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const [updateProfileAPI, { isLoading }] = useUpdateProfileAPIMutation();
  const { userData } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateHandler = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password are must be same!");
    } else {
      try {
        const response = await updateProfileAPI({
          name,
          password,
        }).unwrap();
        dispatch(login({ ...response }));
        toast.success("Profile updated successfully!");
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      } finally {
        setPassword("");
        setConfirmPassword("");
      }
    }
  };

  useEffect(() => {
    setName(userData?.name);
  }, [userData?.name]);

  return (
    <FormContainer>
      <h1 className="text-center fw-bold mb-3 text-primary">Update</h1>
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

        <Form.Group className="my-3" controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
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
          onClick={updateHandler}
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Loading..
            </>
          ) : (
            "Update"
          )}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UpdateProfile;
