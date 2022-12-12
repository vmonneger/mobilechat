import { Navigate, useLocation } from 'react-router-dom'
import { userContext } from '../Context/UserContext'
import { useContext } from 'react'

export default function NeedAuth(props) {
  let location = useLocation()
  const [loggedUser, setLoggedUser] = useContext(userContext)
  console.log('log', loggedUser)

  if (loggedUser) {
    return props.children
  } else {
    return <Navigate to="/login" state={{ from: location }} />
  }
}
