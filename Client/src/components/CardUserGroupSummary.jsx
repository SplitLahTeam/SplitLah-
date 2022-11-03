import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CardUserGroupSummary = () => {

  const totalGroups = 3;
  const userGroups = [
    { name: "Colleagues" },
    { name: "Family" },
    { name: "SEIF-10" }
  ]

  return (
    <div>
      <Card variant="light" style={{ width: "30rem" }}>
        <Card.Header>Groups – {totalGroups}</Card.Header>
        <Card.Body>
          <Card.Text>
            <ul>
              {userGroups.map((item) => (
                <li>{item.name}</li>
              ))}
              <a href="/group/register"><li>Create a group</li></a>
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardUserGroupSummary;
