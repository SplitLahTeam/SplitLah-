import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/esm/Image";
import profile from "../images/profile.png";
import CardMoneyBalance from "../components/CardMoneyBalance";
import CardIndividualMember from "../components/CardIndividualMember";

const GroupDetails = () => {
  const navigate = useNavigate();
  const groupName = useSelector((state) => state.selectedGroup.name);
  const groupDescription = useSelector((state) => state.selectedGroup.description);
  const groupMembers = useSelector((state) => state.selectedGroup.userList);

  const totalMembers = useSelector((state) => state.selectedGroup.userList?.length);

  return (
    <div>
      <div className="groups-head">
        <div className="group-thumbnail">{Array.from(groupName)[0]}</div>
        <h1>{groupName}</h1>
        <p className="text-muted">{groupDescription}</p>
        <Button onClick={() => navigate("/group/edit")}>Edit Group</Button>
      </div>
      <hr className="divider"></hr>
      <h3>Balances</h3>
      <div className="balance-section">
        <div className="money-balance">
          <div className="card-money-balance">
            <CardMoneyBalance
              moneyBalanceTitle="You owe"
              moneyBalanceAmount="$0.00"
            />
          </div>
          <div className="card-money-balance">
            <CardMoneyBalance
              moneyBalanceTitle="You are owed"
              moneyBalanceAmount="$0.00"
            />
          </div>
          <div className="card-money-balance">
            <CardMoneyBalance
              moneyBalanceTitle="Total balance"
              moneyBalanceAmount="$0.00"
            />
          </div>
          <div className="button-stacked">
            <div className="button-padding">
              <Button>View Transactions</Button>
            </div>
            <div className="button-padding">
              <Button>Add Transactions</Button>
            </div>
          </div>
        </div>
      </div>
      <hr className="divider"></hr>
      <h3>Members – {totalMembers}</h3>
      <div className="group-cluster">
        {groupMembers.map((member) => (
          <CardIndividualMember
            groupMemberName="Member's Name"
          />
        ))}
      </div>
    </div>
  );
};

export default GroupDetails;
