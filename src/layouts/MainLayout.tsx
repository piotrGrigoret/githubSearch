import { Header } from '@/components/Header/Header'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div className='w-full h-full flex flex-col	'>
        <Header/>
        <div className='flex-1'>
          <Outlet/>
        </div>
    </div>
  )
}
