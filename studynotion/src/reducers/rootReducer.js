import { combineReducers } from "@reduxjs/toolkit";
import  authReducer  from "./slices/authSlice";
import  profileReducer  from "./slices/profileSlice";
import courseReducer  from "./slices/courseSlice";
import cartReducer from "./slices/cartSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    course: courseReducer,
    cart: cartReducer,
})

export default rootReducer;