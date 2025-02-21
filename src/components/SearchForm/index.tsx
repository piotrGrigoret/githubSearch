import {  useCallback } from 'react';
import debounce from 'lodash/debounce';
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from 'react-redux';
import { selectGithub,  setUsername } from '@/redux/slices/githubSlice';

// interface SearchFormProps {
//   onSearch: (username: string) => void;
// }

export const SearchForm = () => { 
    const dispatch = useDispatch();  
    const {username} = useSelector(selectGithub);
    // Локальное состояние для инпута
    // const [username, setUsername] = useState('');

    // Создаем отложенную функцию поиска (debounce)
    // useCallback используется чтобы функция не пересоздавалась при каждом рендере
    const debouncedSearch = useCallback(
    debounce((value: string) => {
        dispatch(setUsername(value));
    }, 100), 
    [dispatch]
    );

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const value = e.target.value;
    
    // // setUsername(value); // Обновляем локальное состояние мгновенно
    // debouncedSearch(value); // Запускаем поиск с задержкой
    // };
    // Обработчик изменения инпута
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        debouncedSearch(value);
      };
    return (
        <Input
        type="text"
        value={username}
        onChange={handleChange}
        placeholder="github username"

        />
    );
};