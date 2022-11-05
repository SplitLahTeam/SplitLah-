import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/esm/Image";
import profile from "../images/profile.png";
import "../App.css";

const CardIndividualMember = (props) => {
  return (
    <div>
      <Card className="p-3 m-3 group-card" style={{ width: "17rem" }}>
        <Image src={profile} style={{ width: "100px", borderRadius: "50%" }} />
        <Card.Body>
          <Card.Title style={{ fontSize: "28px", textAlign: "center" }}>
            {props.groupMemberName}
          </Card.Title>
          <hr className="divider"></hr>
          <Card.Text style={{ textAlign: "center" }}>Insert Amount</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardIndividualMember;
