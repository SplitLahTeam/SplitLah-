import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {selectedTransactionActions} from '../store/selectedTransactionSlice'
import Button from "react-bootstrap/Button";
import CardMoneyBalance from "../components/CardMoneyBalance";
import CardIndividualMember from "../components/CardIndividualMember";

const GroupDetails = () => {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user)
  const groupName = useSelector((state) => state.selectedGroup.name);
  const groupDescription = useSelector((state) => state.selectedGroup.description);
  const netAmount = useSelector((state)=>state.selectedGroup.netAmount)
  const groupMembers = useSelector((state) => state.selectedGroup.userList);
  const totalMembers = useSelector((state) => state.selectedGroup.userList?.length);
  const dispatch = useDispatch()

  const handleSettleUp = (member) => () => {
    let amount = member.amountToRecieve
    const description = "Settling Up Transaction"
    let paidBy, receivedBy
    if (amount < 0){
      receivedBy = {id: member.id, name:member.name, email:member.email}
      paidBy = loggedInUser
      amount = (-1)*amount
    } else {
      receivedBy = loggedInUser
      paidBy = {id: member.id, name:member.name, email:member.email}
    }
    dispatch(selectedTransactionActions.updatePartialTransaction({paidBy, receivedBy,amount,description}))
    dispatch(selectedTransactionActions.setNavigationFlagTrue())
    navigate('/transaction/register')
  }

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
            handleSettleUp = {handleSettleUp(member)}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupDetails;
