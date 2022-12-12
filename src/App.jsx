import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login, Signup, Home, Gym, Member, CheckIn } from './pages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-screen h-screen bg-obsidian text-slate-200'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/login/:who' element={<Login />} />
          <Route path='/signup/:who' element={<Signup />} />
          <Route path='/gym' element={<Gym />} />
          <Route path='/gym/checkin' element={<CheckIn />} />
          <Route path='/gym/checkin/:memberId' element={<CheckIn />} />
          <Route path='/member' element={<Member />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
