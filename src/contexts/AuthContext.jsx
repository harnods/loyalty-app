import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const s = localStorage.getItem('loyalty_user')
      return s ? JSON.parse(s) : null
    } catch { return null }
  })

  function login(userData) {
    setUser(userData)
    localStorage.setItem('loyalty_user', JSON.stringify(userData))
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('loyalty_user')
  }

  function savePin(pin) {
    const updated = { ...user, pin }
    setUser(updated)
    localStorage.setItem('loyalty_user', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, savePin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
