import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Video } from './pages/Video'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/watch' element={<Video />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
