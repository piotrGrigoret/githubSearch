import { Route, Routes } from "react-router-dom"
import { MainLayout } from "./layouts/MainLayout"
import { NotFound } from "./pages/NotFound"
import { MainPage } from "./pages/MainPage"


function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/*" element={<NotFound/>}></Route>
      </Route>
    </Routes>
  )
}

export default App
