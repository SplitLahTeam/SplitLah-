import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../App.css";

const CardIndividualGroup = (props) => {
  return (
    <div>
      <Card className="p-3 m-3 group-card" style={{ width: "17rem" }}>
        <div className="group-thumbnail">{Array.from(props.groupName)[0]}</div>
        <Card.Body>
          <Card.Title style={{ fontSize: "28px", textAlign: "center" }}>{props.groupName}</Card.Title>
          <hr className="divider"></hr>
          <Card.Text style={{ textAlign: "center" }}>Insert Amount</Card.Text>
          <div className="button-spacing">
            <Button className="center-button" onClick={props.groupClick} variant="primary">
              View Group
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default CardIndividualGroup;