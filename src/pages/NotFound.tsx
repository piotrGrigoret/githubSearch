import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const NotFound = () => {


  return (
    <div className="container h-full grid place-items-center mx-auto xl:max-w-container-xl">
      <DotLottieReact
        className='animation max-w-container-sm h-auto mx-auto'
        src='/lottie/notFound.lottie'
        loop
        autoplay
      />
    </div>
  )
}
