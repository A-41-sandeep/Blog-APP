import {configureStore, createSlice} from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{islogedIn:false},
    reducers:{
        login(state){
            state.islogedIn=true;
        },
        logout(state)
        {
            state.islogedIn=false;
        }
    }
});

export const authAction=authSlice.actions;

export const store=configureStore({
    reducer:authSlice.reducer
})