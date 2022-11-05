import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../App.css";

const CardIndividualMember = (props) => {
  return (
    <div>
      <Card className="p-3 m-3 group-card" style={{ width: "17rem" }}>
        <div className="group-thumbnail">{Array.from(props.groupMemberName)[0]}</div>
        <Card.Body>
          <Card.Title style={{ fontSize: "28px", textAlign: "center" }}>{props.groupMemberName}</Card.Title>
          <hr className="divider"></hr>
          <Card.Text style={{ textAlign: "center" }}>Insert Amount</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
export default CardIndividualMember;