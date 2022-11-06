import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import {transactionListActions} from '../store/transactionListSlice'
import CardRecentExpenses from "../components/CardRecentExpenses";

const GroupTransactions = () => {

  const groupName = useSelector((state) => state.selectedGroup.name);
  const groupId = useSelector((state)=>state.selectedGroup.groupId)
  const paidTransactionsPageNum = useSelector((state)=>state.transactionList.paidTransactionsPageNum)
  const receivedTransactionsPageNum = useSelector((state)=>state.transactionList.receivedTransactionsPageNum)
  const paidTransactionList = useSelector((state)=>state.transactionList.paidTransactions)
  const receivedTransactionList = useSelector((state)=>state.transactionList.receivedTransactions)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(transactionListActions.updatePaidTransactionPageNum(1))
    dispatch(transactionListActions.updateReceivedTransactionPageNum(1))
  },[])

  useEffect(()=>{
    fetch('/api/transactions/paid',{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        groupId,
        pageNum: paidTransactionsPageNum
      }) 
    }).then((res)=>{
      if (res.status !== 200){
        throw new Error({msg:"Some Comm Error"})
      }
      return res.json()
    }).then((data)=>{
      dispatch(transactionListActions.updatePaidTransactionList(data))
    }).catch((error)=>{
      console.log(error)
    })},[paidTransactionsPageNum])

  useEffect(()=>{  
    fetch('/api/transactions/received',{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        groupId,
        pageNum: receivedTransactionsPageNum
      }) 
    }).then((res)=>{
      if (res.status !== 200){
        throw new Error({msg:"Some Comm Error"})
      }
      return res.json()
    }).then((data)=>{
      dispatch(transactionListActions.updateReceivedTransactionList(data))
    }).catch((error)=>{
      console.log(error)
    })
  },[receivedTransactionsPageNum])

  const decPaidTransactionsPageNum = () => {
    if (paidTransactionsPageNum>1){
      dispatch(transactionListActions.updatePaidTransactionPageNum(paidTransactionsPageNum-1))
    }
  }

  const incPaidTransactionsPageNum = () => {
    if (paidTransactionList.length > 0){
      dispatch(transactionListActions.updatePaidTransactionPageNum(paidTransactionsPageNum+1))
    }
  }

  const decReceivedTransactionsPageNum = () => {
    if (receivedTransactionsPageNum>1){
      dispatch(transactionListActions.updateReceivedTransactionPageNum(receivedTransactionsPageNum-1))
    }
  }

  const incReceivedTransactionsPageNum = () => {
    if (receivedTransactionList.length > 0){
      dispatch(transactionListActions.updateReceivedTransactionPageNum(receivedTransactionsPageNum+1))
    }
  }
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
        expenseTitle="Paid to" transactionList={paidTransactionList} />
        <ButtonGroup aria-label="Basic example">
          <Button onClick={decPaidTransactionsPageNum} variant="secondary">{"<<"}</Button>
          <p>Page # {paidTransactionsPageNum} .</p>
          <Button onClick={incPaidTransactionsPageNum} variant="secondary">{">>"}</Button>
        </ButtonGroup>
        <CardRecentExpenses 
        expenseTitle="Received from" transactionList={receivedTransactionList} />
        <ButtonGroup aria-label="Basic example">
          <Button onClick={decReceivedTransactionsPageNum} variant="secondary">{"<<"}</Button>
          <p>Page # {receivedTransactionsPageNum} .</p>
          <Button onClick={incReceivedTransactionsPageNum} variant="secondary">{">>"}</Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default GroupTransactions;