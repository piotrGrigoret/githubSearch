import { exampleMethod } from '@/redux/slices/repositoriesSlice';
import { useDispatch } from 'react-redux';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const MainPage = () => {
    const dispath = useDispatch();
    const tryRedux = () =>{
        dispath(exampleMethod());
    }
    return (
        <div 
            className='container h-full grid place-items-center mx-auto xl:max-w-container-xl' 
            onClick={tryRedux}
        >
            <DotLottieReact
                className='animation max-w-64 mx-auto'
                src='/lottie/loadGitHub.lottie'
                loop
                autoplay
            />        
        </div>
    )
}
