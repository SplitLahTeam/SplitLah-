import Card from 'react-bootstrap/Card';

const CardMoneyBalance = (props) => {
  return (
    <div>
      <Card variant="light" style={{ width: '10rem' }}>
        <Card.Header>{props.moneyBalanceTitle}</Card.Header>
        <Card.Body>
          <Card.Text>${props.moneyBalanceAmount}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CardMoneyBalance;