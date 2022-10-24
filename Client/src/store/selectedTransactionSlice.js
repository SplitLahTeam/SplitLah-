import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    createdBy:"",
    paidBy:"",
    recivedBy:"",
    amount:"",
    description:"",
    createdDateTime:"",
    updatedDateTime:""
}

const selectedTransactionSlice = createSlice({
    name: "selectedTransaction",
    initialState,
    reducers:{
        updateSelectedTransaction : (state, action) => {

        }
    }
})

export const selectedTransactionActions = selectedTransactionSlice.actions
export default selectedTransactionSlice.reducer