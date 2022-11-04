import Accordion from 'react-bootstrap/Accordion';

const CardRecentExpenses = ({expenseTitle, transactionList}) => {
  console.log(transactionList)
  return (
    <div>
    <Accordion defaultActiveKey="0" style={{ width: '24rem' }} >
      <Accordion.Item eventKey="0">
        <Accordion.Header>{expenseTitle}</Accordion.Header>
        <Accordion.Body>
            <ul>{transactionList.map((transaction) =>
              <li key={transaction._id}>{transaction.paidByName || transaction.receivedByName} on {transaction.updatedAt} ({transaction.description}) ${transaction.amount}</li>
            )}
            </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
  )
}

export default CardRecentExpenses;