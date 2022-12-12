import React from 'react'
import { useEffect, useState } from 'react'
import ChatListItems from './ChatListItems'
import useGetUserList from '../../Hook/useGetUserList'
import { useNavigate } from 'react-router-dom'
import useBackendPing from '../../Hook/useBackendPing'

import './chatList.css'

export default function ChatList() {
  const [userList, setUserList] = useState([])

  const navigate = useNavigate()
  const getUserList = useGetUserList()
  const backendPing = useBackendPing()

  const handleSubmit = (e) => {
    e.preventDefault()
    const userId = e.target[0].value
    backendPing(userId).then((data) => console.log(data))
    navigate('chatroom')
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
    console.log('user list', userList)
    console.log('ok')
    const url = new URL('http://localhost:9090/.well-known/mercure')
    url.searchParams.append('topic', 'https://example.com/my-private-topic')

    const eventSource = new EventSource(url, { withCredentials: true })
    eventSource.onmessage = handleMessage

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <div className="main__chatlist">
      <button className="btn">
        <i className="fa fa-plus"></i>
        <span>Conversation</span>
      </button>
      <div className="chatlist__heading">
        <h2>Chats</h2>
        <button className="btn-nobg">
          <i className="fa fa-ellipsis-h"></i>
        </button>
      </div>
      <div className="chatList__search">
        <div className="search_wrap">
          <input type="text" placeholder="Search" required />
          <button className="search-btn">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>

      <div className="chatlist__items">
        {userList.map((user, index) => {
          return (
            <ChatListItems
              name={user.username}
              key={user.id}
              animationDelay={index + 1}
              // active={user.active ? "active" : ""}
              // isOnline={user.isOnline ? "active" : ""}
              image="https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_1280.png"
            />
          )
        })}
      </div>
    </div>
  )
}
