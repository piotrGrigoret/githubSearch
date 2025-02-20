import { Header } from '@/components/Header/Header'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
    </div>
  )
}
