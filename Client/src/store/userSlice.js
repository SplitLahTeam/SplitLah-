import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    _id: "",
    name: "",
    email: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateLoggedInUser : (state, action) => {
            // Update state to store details of current logged In user
        }
    }
})

export const userActions = userSlice.actions
export default userSlice.reducer
