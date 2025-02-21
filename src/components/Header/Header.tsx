import React from 'react'
import { Link } from 'react-router-dom';
// import { Input } from "@/components/ui/input";
import { useLocation } from "react-router-dom";
import { SearchForm } from '../SearchForm';


export const Header = () => {
  const location = useLocation();
  
  // const handleSearch = async (e: React.FormEvent) => {
  //     e.preventDefault()
  //     if (!username.trim()) return
  
  //     setIsLoading(true)
  //     setError("")
  
  //     try {
  //       const response = await fetch(`https://api.github.com/users/${username}/repos`)
  //       if (!response.ok) {
  //         throw new Error("Пользователь не найден")
  //       }
  //       const data = await response.json()
  //       setRepos(data)
  //       console.log(data);
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : "Произошла ошибка")
  //       console.log(error);
  //     } finally {
  //       setIsLoading(false)
  //     }
  // }

  return (
      <div className='container flex justify-around gap-y-6 flex-col items-center lg:gap-y-0 lg:flex-row xl:max-w-container-xl'>
        <Link to={'/'}>
            <img 
              className="w-48 mx-auto md:w-80" 
              src="/assets/svg/github-high-resolution-logo-transparent.svg" 
              alt="" 
            />
        </Link>
        {location.pathname === "/" && 
          // <Input  placeholder="Github username" />
          <SearchForm/>
        }
      </div>
  )
}
