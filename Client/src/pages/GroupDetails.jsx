import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import CardMoneyBalance from "../components/CardMoneyBalance";
import CardIndividualMember from "../components/CardIndividualMember";

const GroupDetails = () => {
  const navigate = useNavigate();
  const groupName = useSelector((state) => state.selectedGroup.name);
  const groupDescription = useSelector((state) => state.selectedGroup.description);
  const netAmount = useSelector((state)=>state.selectedGroup.netAmount)
  const groupMembers = useSelector((state) => state.selectedGroup.userList);
  const totalMembers = useSelector((state) => state.selectedGroup.userList?.length);
  console.log("group Members", groupMembers)
  return (
    <div>
      <div className="groups-head">
        <div className="circle-thumbnail">{Array.from(groupName)[0]}</div>
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
              moneyBalanceAmount={netAmount.received}
            />
          </div>
          <div className="card-money-balance">
            <CardMoneyBalance
              moneyBalanceTitle="You are owed"
              moneyBalanceAmount={netAmount.paid}
            />
          </div>
          <div className="card-money-balance">
            <CardMoneyBalance
              moneyBalanceTitle="Total balance"
              moneyBalanceAmount={netAmount.netToReceive}
            />
          </div>
          <div className="button-stacked">
            <div className="button-padding">
              <Button onClick={() => navigate("/detailedpages/group/transactions")}>View Transactions</Button>
            </div>
            <div className="button-padding">
              <Button onClick={() => navigate("/transaction/register")}>Add Transactions</Button>
            </div>
          </div>
        </div>
      </div>
      <hr className="divider"></hr>
      <h3>Members – {totalMembers}</h3>
      <div className="group-cluster">
        {groupMembers.map((member) => (
          <CardIndividualMember
            groupMemberName={member.name}
            amountToRecieve = {member.amountToRecieve}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupDetails;
