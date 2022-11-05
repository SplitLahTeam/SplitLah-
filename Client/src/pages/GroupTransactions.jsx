import CardRecentExpenses from "../components/CardRecentExpenses";

const GroupTransactions = () => {

  const groupName = "Group Name";

  //* Placeholders
  const recentTransactionPaidList = [];
  const recentTransactionReceviedList = [];

  return (
    <div>
      <div className="transactions-head">
        <div className="circle-thumbnail">{Array.from(groupName)[0]}</div>
        <h1>Transactions</h1>
        <p className="text-muted">For {groupName}</p>
      </div>
      <hr className="divider"></hr>
      <div className="recent-expenses">
        <CardRecentExpenses 
        expenseTitle="Paid to" transactionList={recentTransactionPaidList} />
        <CardRecentExpenses 
        expenseTitle="Received from" transactionList={recentTransactionReceviedList} />
      </div>
    </div>
  )
}

export default GroupTransactions;