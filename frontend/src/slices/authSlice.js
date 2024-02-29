import { createSlice } from "@reduxjs/toolkit";
import { parse } from "dotenv";

const intitialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const authSlice = createSlice({
    name: 'auth',
    intitialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        }
    }
})

export const {setCredentials} = authSlice.actions

export default authSlice.reducer