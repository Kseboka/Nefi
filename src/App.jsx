import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components'
import { AuthProvider } from './contexts/auth'
import { Login, Signup, Home, Gym, Member, CheckIn, MemberPage, AddMember, MemberInfo } from './pages'

function App() {
  return (
    <div className='w-screen h-screen bg-obsidian text-slate-200'>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/login/:user_id' element={<Login />} />
            <Route path='/signup/:user_id' element={<Signup />} />

            {/* GYM */}
            <Route path='/gym' element={<Layout />}>
              <Route path='/gym' element={<Gym />} />
              <Route path='/gym/checkin' element={<CheckIn />} />
              <Route path='/gym/checkin/:memberId' element={<CheckIn />} />
              <Route path='/gym/members' element={<MemberPage />} />
              <Route path='/gym/members/add-member' element={<AddMember />} />
              <Route path='/gym/members/:member_id' element={<MemberInfo />} />
            </Route>
          </Routes>
          {/* Member and member sub pages */}
          {/* <Route path='/member' element={<Member />} /> */}
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
