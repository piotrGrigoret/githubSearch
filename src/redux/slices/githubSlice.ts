import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";



interface GithubState {
  username: string;
  page: number;
}
  
const initialState: GithubState = {
  username: '',
  page: 1
}

const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers:{
      setUsername: (state, action: PayloadAction<string>) => {
        // При изменении username сбрасываем страницу
        state.username = action.payload;
        state.page = 1;
      },
      incrementPage: (state) => {
          state.page += 1;
      },
      resetSearch: (state) => {
          state.username = '';
          state.page = 1;
      }
    }
});


export const selectGithub =  (state: RootState) => state.github;

export const { setUsername, incrementPage, resetSearch } = githubSlice.actions;
export default githubSlice.reducer;
