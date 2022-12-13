import { useState, createContext } from 'react'

export const userContext = createContext('')

export default function UserProvider(props) {
  const [user, setUser] = useState(localStorage.getItem('token'))

  window.addEventListener('storage', () => {
    if (!localStorage.getItem('token')) {
      setUser(null)
      localStorage.clear()
    }
  })

  return <userContext.Provider value={[user, setUser]}>{props.children}</userContext.Provider>
}
