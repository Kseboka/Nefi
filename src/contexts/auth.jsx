import { useState, createContext, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../utils/supabase'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) setIsAuth(false)
      else {
        setIsAuth(true)
        setUser(user)
      }
    }
    getUser()
  }, [])

  return <AuthContext.Provider value={{ isAuth, user }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
