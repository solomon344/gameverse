import './App.css'
import Landing from './Pages/Landing/Landing'
import Home from './Pages/Home/Home'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {
  
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Landing />} />
    <Route path='/home' element={<Home />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
