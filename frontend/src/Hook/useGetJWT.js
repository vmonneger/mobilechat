import { userContext } from '../Context/UserContext'

export default function useGetJWT() {
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
        localStorage.setItem('token', data?.JWT ?? '')
        return data?.JWT
      })
  }
}
