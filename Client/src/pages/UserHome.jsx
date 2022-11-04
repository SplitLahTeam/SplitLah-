import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {userSummaryActions} from '../store/userSummarySlice'
import profile from "../images/profile.png";
import CardMoneyBalance from "../components/CardMoneyBalance";
import CardRecentExpenses from "../components/CardRecentExpenses";
import CardUserGroupSummary from "../components/CardUserGroupSummary";

const UserHome = () => {

  const navigate = useNavigate()
  // const userName = "Anam";
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.user)
  const groupList = useSelector((state)=>state.userSummary.groupList)
  const netReceivedAmount = useSelector((state)=>state.userSummary.netReceivedAmount)
  const netPaidAmount = useSelector((state)=>state.userSummary.netPaidAmount)
  const netAmountToReceive = useSelector((state)=>state.userSummary.netAmountToReceive)
  // let recentTransactionReceviedList = [[{id:1, receivedByName:"",description:"",amount:0}]]
  const recentTransactionReceviedList = useSelector((state)=>state.userSummary.transactionReceivedList)
  const recentTransactionPaidList = useSelector((state)=>state.userSummary.transactionPaidList)
  
  useEffect(()=>{
    fetch('/api/users/summary')
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
      dispatch(userSummaryActions.updateUserSummary(data))
    })
  },[])

  return (
    <div>
      <div className="dashboard-head">
        <Image src={profile} style={{ width: '100px', borderRadius: '50%' }}/>
        <h1>Hi {user.name}!</h1>
        <p className="text-muted">Welcome to your dahsboard</p>
        <Button onClick={() => navigate("/users/edit")} variant="primary">Edit Profile</Button>
      </div>
      <div className="money-balance">
        <CardMoneyBalance moneyBalanceTitle="You owe" moneyBalanceAmount={netReceivedAmount}/>
        <CardMoneyBalance moneyBalanceTitle="You are owed" moneyBalanceAmount={netPaidAmount}/>
        <CardMoneyBalance moneyBalanceTitle="Total balance" moneyBalanceAmount={netAmountToReceive} />
      </div>
      <div className="recent-expenses">
        <CardRecentExpenses 
        expenseTitle="Paid to" transactionList={recentTransactionPaidList} />
        <CardRecentExpenses 
        expenseTitle="Received from" transactionList={recentTransactionReceviedList} />
      </div>
      <div className="users-groups">
        <CardUserGroupSummary />
      </div>
    </div>
  );
};

export default UserHome;
