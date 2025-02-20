import { exampleMethod } from '@/redux/slices/repositoriesSlice';
import { useDispatch } from 'react-redux';

export const MainPage = () => {
    const dispath = useDispatch();
    const tryRedux = () =>{
        dispath(exampleMethod());
    }
    return (
        <div onClick={tryRedux}>
            MainPage
        </div>
    )
}
