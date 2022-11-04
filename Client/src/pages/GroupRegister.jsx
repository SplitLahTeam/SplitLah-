import {useState, useRef} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const GroupRegister = () => {

  const [selectedUserIdList, setSelectedUserIdList] = useState([{id:1, name:"A"}])
  const [userSearchResults, setUserSearchResults] = useState([{id:1, name:"A", email:"A"}, {id:2, name:"B", email:"B"}])
  const [showSearchResults, setShowSearchResults] = useState(true)

  const handleUserSearch = () => {
    console.log("Search")
  }

  const handleAddUser = () => {}

  const handleRemoveUser = () => {}

  const handleSubmit = () => {}

  return (
    <Container fluid>
      <Row className='text-center'>
      <h2>Create a Group</h2>
        <Col className='text-center d-flex justify-content-center'>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className='text-center'>Group Name</Form.Label>
              <Form.Control style={{width:'300px'}} placeholder="Enter Name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Group Description</Form.Label>
              <Form.Control as="textarea" placeholder="Description" style={{ height: '100px'}}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className='d-block'>Members</Form.Label>
              {showSearchResults && 
                <Dropdown onClick={handleUserSearch} className='d-inline'>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />               
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {userSearchResults.map((user)=><Dropdown.Item>{user.name} : {user.email}</Dropdown.Item>)}
                  </Dropdown.Menu>
                </Dropdown>
                }
                <Form.Control className='d-inline' style={{width:'230px'}} placeholder="Find by name or Email"/>
            </Form.Group>
            <Button type="submit">CREATE</Button>
            <i className="fa-regular fa-user"></i>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default GroupRegister