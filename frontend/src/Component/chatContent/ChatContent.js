import React, { Component, useState, createRef, useEffect } from 'react'
import { Route, Link, useParams, useLocation } from 'react-router-dom'

import './chatContent.css'
import ChatItem from './ChatItems'

export default function ChatContent() {
  const [inputMessage, setInputMessage] = useState('')
  let { userId } = useParams()

  console.log(userId)

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'))

    fetch(`http://localhost:8245/chatroom/${userId}`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      // headers: {
      //   Authorization: `Basic ${credentials}`,
      // },
      body: JSON.stringify(currentUser.userid),
    })
  }, [userId])

  // messagesEndRef = createRef(null)
  const chatItms = [
    {
      key: 1,
      image: 'https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg',
      type: '',
      msg: 'Hello ca va?',
    },
    {
      key: 2,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
      type: 'other',
      msg: 'oui et toi?',
    },
    {
      key: 3,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
      type: 'other',
      msg: 'quoi de neuf?',
    },
    {
      key: 4,
      image: 'https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg',
      type: '',
      msg: 'rien de spécial.',
    },
    {
      key: 5,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
      type: 'other',
      msg: "finalement t'as un paln?",
    },
    {
      key: 6,
      image: 'https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg',
      type: '',
      msg: 'oui',
    },
    {
      key: 7,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
      type: 'other',
      msg: 'tant mieux',
    },
  ]

  // const scrollToBottom = () => {
  //   this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  // }

  // const componentDidMount = () => {
  //   window.addEventListener('keydown', (e) => {
  //     if (e.keyCode == 13) {
  //       if (this.state.msg != '') {
  //         this.chatItms.push({
  //           key: 1,
  //           type: '',
  //           msg: this.state.msg,
  //           image: 'https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg',
  //         })
  //         this.setState({ chat: [...this.chatItms] })
  //         this.scrollToBottom()
  //         this.setState({ msg: '' })
  //       }
  //     }
  //   })
  //   this.scrollToBottom()
  // }
  // onStateChange = (e) => {
  //   this.setState({ msg: e.target.value })
  // }

  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <p>Le user destinataire</p>
          </div>
        </div>

        <div className="blocks">
          <div className="settings">
            <button className="btn-nobg">
              <i className="fa fa-cog"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="content__body">
        <div className="chat__items">
          {chatItms.map((itm, index) => {
            return <ChatItem animationDelay={index + 2} key={itm.key} user={itm.type ? itm.type : 'me'} msg={itm.msg} />
          })}
        </div>
      </div>
      <div className="content__footer">
        <div className="sendNewMessage">
          <input
            type="text"
            placeholder="Ecris ton message ici"
            onChange={(e) => setInputMessage(e.target.value)}
            value={inputMessage}
          />
          <button className="btnSendMsg w-25" id="sendMsgBtn">
            Envoyer
          </button>
        </div>
      </div>
    </div>
  )
}
