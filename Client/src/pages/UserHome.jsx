import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import profile from "../images/profile.png";
import CardMoneyBalance from "../components/CardMoneyBalance";
import CardRecentExpenses from "../components/CardRecentExpenses";
import CardUserGroupSummary from "../components/CardUserGroupSummary";

const UserHome = () => {

  const userName = "Anam";

  return (
    <div>
      <div className="dashboard-head">
        <Image src={profile} style={{ width: '100px', borderRadius: '50%' }}/>
        <h1>Hi {userName}!</h1>
        <p className="text-muted">Welcome to your dahsboard</p>
        <Button href="/users/edit" variant="primary">Edit Profile</Button>
      </div>
      <div className="money-balance">
        <CardMoneyBalance moneyBalanceTitle="You owe" moneyBalanceAmount="20.29"/>
        <CardMoneyBalance moneyBalanceTitle="You are owed" moneyBalanceAmount="45.67"/>
        <CardMoneyBalance moneyBalanceTitle="Total balance" moneyBalanceAmount="25.38" />
      </div>
      <div className="recent-expenses">
        <CardRecentExpenses 
        expenseTitle="Paid to"
        paymentName="Tania" 
        paymentDate="24-Sep-2022"
        paymentAmount="13.60" />
        <CardRecentExpenses 
        expenseTitle="Received from"
        paymentName="Anto" 
        paymentDate="18-Sep-2022"
        paymentAmount="9.99" />
      </div>
      <div className="users-groups">
        <CardUserGroupSummary />
      </div>
    </div>
  );
};

export default UserHome;
