import {useSelector, useDispatch} from 'react-redux'
import { userActions } from '../store/userSlice'
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import "../App.css"

const NavBar = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const userLoggedIn = !(user.id === "")
  const initialUserState = {id:"", name:"", email:""}

  const handleBrandTxtClick = () => {navigate('/')}
  const handleDashboardTxtClick = () => {navigate('/detailedpages/user/home')}
  const handleGroupsTxtClick = () => {navigate('/detailedpages/groups/summary')}
  const handleLogOutButtonClick = () => {
    fetch('/api/users/logout',{
      method:"POST"
    }).then((res)=>{
      if (res.status === 202) {
        dispatch(userActions.updateLoggedInUser(initialUserState))
        navigate('/')
      }
    }).catch ((error)=>{
      console.log(error)
    })
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={handleBrandTxtClick}>SPLITLAH!</Navbar.Brand>
          <Nav className="me-auto">
            {userLoggedIn && <Nav.Link onClick={handleDashboardTxtClick}>My Dashboard</Nav.Link>}
            {userLoggedIn && <Nav.Link onClick={handleGroupsTxtClick}>My Groups</Nav.Link>}
            {userLoggedIn && <p className='text-light'>Hi! {user.name}</p>}
            {userLoggedIn && <Button  onClick={handleLogOutButtonClick} variant="danger">Log out</Button>}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar