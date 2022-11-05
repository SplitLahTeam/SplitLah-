import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const TransactionRegister = () => {
  const [selectedUserList, setSelectedUserList] = useState([]);
  const [userSearchResults, setUserSearchResults] = useState([
    { id: 1, name: "A", email: "A" },
    { id: 2, name: "B", email: "B" },
  ]);
  const searchTextBoxRef = useRef();

  const handleUserSearch = async () => {
    const searchText = searchTextBoxRef.current.value;
    console.log(searchText);
    fetch("/api/users/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchText: searchText }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error({ msg: "Find Call failed" });
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUserSearchResults(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddUser = (user) => {
    return () => {
      const userIdList = selectedUserList.map((user) => user.id);
      if (userIdList.find((id) => id === user.id)) {
        return;
      }
      setSelectedUserList([
        ...selectedUserList,
        { id: user.id, name: user.name, email: user.email },
      ]);
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="transaction-head d-flex justify-content-center">
        <div className="circle-thumbnail">•••</div>
        <h1>Add a transaction</h1>
      </div>
      <hr className="divider"></hr>
      <Container fluid>
        <Row className="text-center">
          <Col className="text-center d-flex justify-content-center">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="d-block">Paid by:</Form.Label>
                <Dropdown onClick={handleUserSearch} className="d-inline">
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {userSearchResults.map((user) => (
                      <Dropdown.Item onClick={handleAddUser(user)}>
                        {user.name} : {user.email}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                  className="d-inline"
                  style={{ width: "230px" }}
                  placeholder="Find by name or email"
                  ref={searchTextBoxRef}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="d-block">Received by:</Form.Label>
                <Dropdown onClick={handleUserSearch} className="d-inline">
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {userSearchResults.map((user) => (
                      <Dropdown.Item onClick={handleAddUser(user)}>
                        {user.name} : {user.email}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                  className="d-inline"
                  style={{ width: "230px" }}
                  placeholder="Find by name or email"
                  ref={searchTextBoxRef}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-center">Amount:</Form.Label>
                <Form.Control
                  name="name"
                  style={{ width: "300px" }}
                  placeholder="Enter amount"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  name="description"
                  as="textarea"
                  placeholder="Description"
                  style={{ height: "100px" }}
                />
              </Form.Group>
              <Button type="submit">Add</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TransactionRegister;
