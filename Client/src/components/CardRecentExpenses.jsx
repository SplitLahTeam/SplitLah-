import Accordion from 'react-bootstrap/Accordion';
// import Moment from 'react-moment'
import moment from 'moment'

const CardRecentExpenses = ({expenseTitle, transactionList}) => {
  // console.log(transactionList[0].updatedAt)
  // const dateToFormat = new Date(transaction.updatedAt)
  console.log(moment.unix(Date.parse(transactionList[0].updatedAt)/1000).format("MM/DD/YYYY HH:mm"))
  // console.log(moment(transactionList[0].updatedAt, "YYYYMMDD HH"))
  return (
    <div>
    <Accordion defaultActiveKey="0" style={{ width: '24rem' }} >
      <Accordion.Item eventKey="0">
        <Accordion.Header>{expenseTitle}</Accordion.Header>
        <Accordion.Body>
            <ul>
              {transactionList.map((transaction,idx) =>
              <li key={idx}>{transaction.paidByName || transaction.receivedByName} on {moment.unix(Date.parse(transaction.updatedAt)/1000).format("DD-MMM-YY")} ({transaction.description}) ${transaction.amount}</li>
            )}
            </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
  )
}

export default CardRecentExpenses;