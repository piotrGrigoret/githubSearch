import React from 'react'
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  

  return (
      <div className='container flex justify-around gap-y-6 flex-col items-center lg:gap-y-0 lg:flex-row xl:max-w-container-xl'>
        <Link to={'/'}>
            <img 
              className="w-48 mx-auto md:w-80" 
              src="/assets/svg/github-high-resolution-logo-transparent.svg" 
              alt="" 
            />
        </Link>
        {location.pathname === "/" && <Input type="email" placeholder="Username" />}
      </div>
  )
}
