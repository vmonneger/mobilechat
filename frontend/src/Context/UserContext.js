import { useState, createContext } from 'react'
import { useEffect } from 'react'

export const userContext = createContext('')

export default function UserProvider(props) {
  const [user, setUser] = useState(localStorage.getItem('token'))
  console.log(user)
  // useEffect(() => {
  //     if (localStorage.getItem('token')) {
  //         console.log('ok')
  //         setUser(localStorage.getItem('token'));
  //     }
  // }, [])
  return <userContext.Provider value={[user, setUser]}>{props.children}</userContext.Provider>
}
