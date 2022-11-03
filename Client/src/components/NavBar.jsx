import {useSelector, useDispatch} from 'react-redux'
import { userActions } from '../store/userSlice'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import "../App.css"

const NavBar = () => {
  
  const user = useSelector((state) => state.user.name)
  const dispatch = useDispatch()
  

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">SPLITLAH!</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/detailedpages/user/home">My Dashboard</Nav.Link>
            <Nav.Link href="/detailedpages/groups/summary">My Groups</Nav.Link>
            <Button href="/" variant="danger">Log out</Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar