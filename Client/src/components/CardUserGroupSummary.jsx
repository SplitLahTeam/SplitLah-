import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CardUserGroupSummary = () => {
  const navigate = useNavigate()
  
  const userGroups = useSelector((state)=>state.userSummary.groupList)
  // const userGroups = [
  //   {id:1, name: "Colleagues" },
  //   {id:2,  name: "Family" },
  //   {id:3,  name: "SEIF-10" }
  // ]
  const totalGroups = userGroups?.length;

  const handleAddGroupClick = () => {navigate('/group/register')}

  return (
    <div>
      <Card variant="light" style={{ width: "30rem" }}>
        <Card.Header>Groups – {totalGroups}</Card.Header>
        <Card.Body>
          <Card.Text>
            <ul>
              {userGroups.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
              <li onClick={handleAddGroupClick}>Create a group</li>
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardUserGroupSummary;
