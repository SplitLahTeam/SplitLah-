import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    groupId: "",
    userIdList: [],
    userNameList:[],
    userBalanceList: []
}

const selectedGroupSlice = createSlice({
    name: "selectedGroup",
    initialState,
    reducers: {
        updateSelectedGroup: (state, action) => {

        }
    }
})

export const selectedGroupActions = selectedGroupSlice.actions
export default selectedGroupSlice.reducer