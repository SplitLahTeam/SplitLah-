
import {useSelector, useDispatch} from 'react-redux'
import { userActions } from '../store/userSlice'

const NavBar = () => {
  
  const user = useSelector((state) => state.user.name)
  const dispatch = useDispatch()
  dispatch(userActions.updateLoggedInUser())
  
  return (
    <div>NavBar</div>
  )
}

export default NavBar