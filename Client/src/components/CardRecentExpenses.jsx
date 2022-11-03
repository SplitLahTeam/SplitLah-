import Accordion from 'react-bootstrap/Accordion';

const CardRecentExpenses = (props) => {
  return (
    <div>
    <Accordion defaultActiveKey="0" style={{ width: '24rem' }} >
      <Accordion.Item eventKey="0">
        <Accordion.Header>{props.expenseTitle}</Accordion.Header>
        <Accordion.Body>
            <ul>
                <li>{props.paymentName} on {props.paymentDate} ... ${props.paymentAmount}</li>
            </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
  )
}

export default CardRecentExpenses;