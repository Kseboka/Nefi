// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import supabase from '../utils/supabase'
// import AuthContext from './AuthContext'

// const AuthProvider = ({ children }) => {
//   const navigate = useNavigate
//   const [isAuth, setIsAuth] = useState(true)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const getUser = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser()

//       if (!user) setIsAuth(false)
//       else setIsAuth(true)
//       // setIsLoading(false)
//     }
//     getUser()
//   }, [])
//   return <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
// }

// export default AuthProvider

// {isLoading ? <h1>Loading</h1> : children}
