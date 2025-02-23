import {  useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import { Input } from "@/components/ui/input";
import { useDispatch } from 'react-redux';
import {   setUsername } from '@/redux/slices/githubSlice';

export const SearchForm = () => { 
    const dispatch = useDispatch();  
    const [inputValue, setInputValue] = useState('');

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            dispatch(setUsername(value));
        }, 500), 
        [dispatch]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        debouncedSearch(value);
        setInputValue(value);
        debouncedSearch(value);
    };
    return (
        <Input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="github username"
        />
    );
};