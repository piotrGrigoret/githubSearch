import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";



interface GithubState {
    username: string
}
  
  const initialState: GithubState = {
    username: ''
  }



const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers:{
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        }
    }
});


export const selectGithub =  (state: RootState) => state.github;

export const {setUsername} = githubSlice.actions;
export default githubSlice.reducer;
