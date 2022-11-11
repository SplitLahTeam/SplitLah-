import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {userActions} from '../store/userSlice'


const RegisterUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userId = useSelector((state)=>state.user.id)

  useEffect(()=>{
    if (userId === ""){
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
    } else {
      navigate("/detailedpages/user/home")
    }
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value
    const password = event.target.password.value

    console.log(name, email,password)

    fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => {
        if (res.status !== 201) {
          throw new Error({ msg: "Couldn't create user" })
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data in Comp: ", data)
        dispatch(userActions.updateLoggedInUser(data))
        navigate('/detailedpages/user/home')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Row className='justify-content-center mt-3'>
      <Col xs={6} lg={4}>
        <Form method="post" onSubmit={handleSubmit}>
          <h2 className='text-center'>Sign Up</h2>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Enter name" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter password" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
          </Form.Group>
          <Row>
            <Col className='text-end'>
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
              <br />
              <Form.Text className="text-muted">
                Already have an account? Login <a onClick={()=>navigate('/')}>here</a>
              </Form.Text>
            </Col>
          </Row>
        </Form>    
      </Col>
    </Row>
  );
}

export default RegisterUser