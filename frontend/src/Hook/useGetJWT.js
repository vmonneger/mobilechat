import { userContext } from '../Context/UserContext'
import { useContext } from 'react'
import jwt_decode from 'jwt-decode'

export default function useGetJWT() {
  const [loggedUser, setLoggedUser] = useContext(userContext)
  return function (username, password) {
    const credentials = btoa(`${username}:${password}`)

    return fetch('http://localhost:8245/login', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const jwt = data?.JWT
        if (jwt) {
          localStorage.setItem('token', jwt ?? '')
          const userInfo = jwt_decode(jwt)
          localStorage.setItem('user', JSON.stringify(userInfo.mercure?.payload))
        }
        setLoggedUser(jwt)
        return jwt
      })
  }
}
