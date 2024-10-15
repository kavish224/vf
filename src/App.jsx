import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Video } from './pages/Video'
import { Signin } from './pages/Signin'
import { RecoilRoot } from 'recoil'
import { Logout } from './pages/Logout'
import { Signup } from './pages/Signup'
function App() {

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/' element={<Home />} />
            <Route path='/watch' element={<Video />} />
            <Route path='/logout' element={<Logout/>} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
