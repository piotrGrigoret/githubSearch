// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { RepoList } from '@/components/RepoList';
// import { SearchForm } from '@/components/SearchForm';
// import { useState } from 'react';
import {  useSelector } from 'react-redux';
import { selectGithub } from '@/redux/slices/githubSlice';
export const MainPage = () => {
    const {username} = useSelector(selectGithub);    
    return (
        <div 
            className='container h-full grid place-items-center mx-auto xl:max-w-container-xl' 
        >
            
            {/* <SearchForm /> */}
            <RepoList username={username} />
        </div>
    )
}
