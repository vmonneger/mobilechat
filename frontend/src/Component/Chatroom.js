import { useEffect, useState } from 'react'
import useGetUserList from '../Hook/useGetUserList'
import useBackendPing from '../Hook/useBackendPing'

export default function UserList() {
  const [userList, setUserList] = useState([])

  const getUserList = useGetUserList()
  const backendPing = useBackendPing()

  const handleSubmit = (e) => {
    e.preventDefault()
    const userId = e.target[0].value
    backendPing(userId).then((data) => console.log(data))
  }

  const handleMessage = (e) => {
    document
      .querySelector('h1')
      .insertAdjacentHTML('afterend', '<div class="alert alert-success w-75 mx-auto">Ping !</div>')
    window.setTimeout(() => {
      const $alert = document.querySelector('.alert')
      $alert.parentNode.removeChild($alert)
    }, 2000)
    console.log(JSON.parse(e.data))
  }

  useEffect(() => {
    getUserList().then((data) => setUserList(data.users))

    const url = new URL('http://localhost:9090/.well-known/mercure')
    url.searchParams.append('topic', 'https://example.com/my-private-topic')

    const eventSource = new EventSource(url, { withCredentials: true })
    eventSource.onmessage = handleMessage

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <div>
      <h1 className="m-5 text-center">Chat room</h1>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">
          Message
        </label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
    </div>
  )
}
