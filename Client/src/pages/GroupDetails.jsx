import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const GroupDetails = () => {

  const navigate = useNavigate()
  const groupName = useSelector((state)=>state.selectedGroup.name)

  return (
    <>
    selected Group : {groupName}
    <p></p>
    <Button onClick={()=>navigate('/group/edit')}>Edit Group</Button>
    <p></p>
    <Button>Add Transactions</Button>
    </>
  )
}

export default GroupDetails