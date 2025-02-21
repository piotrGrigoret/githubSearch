import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <Link to={'/'}>
      <div>
        <img 
          className="w-48 mx-auto md:w-80" 
          src="/assets/svg/github-high-resolution-logo-transparent.svg" 
          alt="" 
        />
      </div>
    </Link>
  )
}
