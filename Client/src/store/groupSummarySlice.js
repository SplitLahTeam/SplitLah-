
import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    groupIdList: [],
    groupNameList: [],
    groupAmountBalanceList:[]
}

const groupSummarySlice = createSlice({
    name: "groupSummary",
    initialState,
    reducers: {
        updateGroupSummary : (state, action) => {

        }
    }
})

export const groupSummaryActions = groupSummarySlice.actions
export default groupSummarySlice.reducer