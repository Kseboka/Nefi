// import { createContext, useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import supabase from '../utils/supabase'

// const AuthContext = createContext()

// export default AuthContext

// const AuthProvider = ({ children }) => {
//   const navigate = useNavigate()
//   useEffect(() => {
//     const getUser = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser()

//       if (!user) navigate('/login')
//     }
//     getUser()
//   }, [])
//   return <AuthContext.Provider>{children}</AuthContext.Provider>
// }

// export default AuthProvider
