import {configureStore, createSlice} from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{ islogedIn: sessionStorage.getItem("islogedIn") === "true" || false},
    reducers:{
        login(state){
            state.islogedIn=true;
            sessionStorage.setItem("islogedIn", true);
        },
        logout(state)
        {
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("islogedIn");
            state.islogedIn=false;
        }
    }
});
  
export const authAction=authSlice.actions;

export const store=configureStore({
    reducer: {
        auth: authSlice.reducer, 
      }
})