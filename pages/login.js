import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useAuthLogin } from "../components/Providers/Auth";

function Login() {
  const loginUser = useAuthLogin()
 
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          loginUser(identifier, password);
        }}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default Login;
