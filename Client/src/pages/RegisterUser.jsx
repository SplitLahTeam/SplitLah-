import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const RegisterUser = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("sign up submitted");
  };

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" placeholder="Enter name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign Up
      </Button>
      <br />
      <Form.Text className="text-muted">
        Already have an account? Login <a href="/">here</a>
      </Form.Text>
    </Form>
  );
}

export default RegisterUser