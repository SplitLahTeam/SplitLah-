import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/esm/Image";
import profile from "../images/profile.png";

const UpdateUser = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="transaction-head d-flex justify-content-center">
        <Image src={profile} style={{ width: '100px', borderRadius: '50%' }}/>
        <h1>Edit profile</h1>
      </div>
      <hr className="divider"></hr>
      <Container fluid>
        <Row className="text-center">
          <Col className="text-center d-flex justify-content-center">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="text-center">Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  style={{ width: "300px" }}
                  placeholder="Enter name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-center">Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  style={{ width: "300px" }}
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-center">Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  style={{ width: "300px" }}
                  placeholder="Enter new password"
                />
              </Form.Group>
              <Button type="submit">Update</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateUser;
