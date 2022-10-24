import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userIdList: [],
    userNameList: [],
    amountList: []    
}

const transactionListSlice = createSlice({
    name: "transactionList",
    initialState,
    reducers: {
        updateTransactionList : (state, action) =>{

        }
    }
})

export const transactionListActions = transactionListSlice.actions
export default transactionListSlice.reducer