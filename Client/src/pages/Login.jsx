import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {userActions} from '../store/userSlice'

const Login = () => {

  const [loginFail, setLoginFail] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userIdState = useSelector((state)=>state.user.id)

  useEffect(()=>{
    if (userIdState === ""){
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
    }
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value
    const password = event.target.password.value
    
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
  };

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <h2>Login</h2>
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
      <Button variant="primary" type="submit">
        Login
      </Button>
      <br />
      <Form.Text className="text-muted">
        Don't have an account? Sign up <a href="/users/register">here</a>
      </Form.Text>
    </Form>
  );
}

export default Login;