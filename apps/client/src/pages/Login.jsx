import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {userActions} from '../store/userSlice'

const Login = () => {

  const [loginFail, setLoginFail] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userId = useSelector((state)=>state.user.id)

  useEffect(()=>{
    fetch('/api/users/checklogin').then((res)=>{
      if (res.status === 200){return res.json()}
      throw new Error})
      .then((data)=>{
        dispatch(userActions.updateLoggedInUser(data))
        navigate('/detailedpages/user/home')
        })
      .catch((error)=>{
        console.log(error)
      })
  },[])

  const loginAndNavigate = (email, password) => {
    fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email, password})
    }).then((res)=>{
      console.log(res)
      if (res.status !== 202){
        setLoginFail(true)
        throw new Error({Msg: "Login Failed"})
      }
      return res.json()})
      .then((data)=>{
        console.log("Data in Comp: ", data)
        dispatch(userActions.updateLoggedInUser(data))
        navigate('/detailedpages/user/home')
        })
      .catch((error)=>{
        console.log(error)
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value
    const password = event.target.password.value
    loginAndNavigate(email, password)
  };

  const handleDemo = () => {
    const email = "a@gmail.com"
    const password = "a123"
    loginAndNavigate(email, password)
  }

  return (
    <Row className="justify-content-center mt-3">
    <Col xs={9} md={4}>
      <Container fluid>
          <h2 className='text-center'>Welcome to SplitLah!</h2>
          <p className='text-center'> Singaporean app to keep track of expenses amongst friends! </p>
        <Form method="post" onSubmit={handleSubmit} className="border p-4">
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <h2 className='text-center'>Login</h2>
            {loginFail && <p variant='primary'>Login Failed</p>}
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
          </Form.Group>
          <Row >
            <Col className='text-end'>
              <Button variant="primary" type="submit">
                Login
              </Button>
              <br />
              <Form.Text className="text-muted">
                Don't have an account? Sign up <a  style={{cursor:'pointer'}} onClick={()=>navigate('/users/register')}>here</a>
              </Form.Text>
            </Col>
          </Row>
        </Form>
          <p className="text-center m-1 mt-3">To explore features without Login ID - <Button variant="secondary" onClick={handleDemo}>Demo</Button> </p>
      </Container>  
    </Col>
    </Row>
  );
}

export default Login;