import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
// , PayloadAction, createAsyncThunk
// import axios from "axios";
// import * as yup from "yup";


// не забыть вынести их в отдельный файл (типы)
interface RepositoriesState{
    repositories:[]
}

const initialState: RepositoriesState = {
    repositories:[],
} 

const repositoriesSlice = createSlice({
    name: 'repositories',
    initialState,
    reducers:{
        exampleMethod:() =>{
            console.log("Hi world!");
        }
    }
});


export const selectEvent =  (state: RootState) => state.repositories;

export const {exampleMethod} = repositoriesSlice.actions;
export default repositoriesSlice.reducer;
