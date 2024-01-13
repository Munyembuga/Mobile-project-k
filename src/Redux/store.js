import authReducer from "./authSlice"
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";



export const store =configureStore({
    reducer:{
        auth: authReducer,
       
    }
})
