import React, { Component, useState, createRef, useEffect } from 'react'

import './chatContent.css'
import ChatItem from './ChatItems'

export default class ChatContent extends Component {
  messagesEndRef = createRef(null)
  chatItms = [
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

  constructor(props) {
    super(props)
    this.state = {
      chat: this.chatItms,
      msg: '',
    }
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode == 13) {
        if (this.state.msg != '') {
          this.chatItms.push({
            key: 1,
            type: '',
            msg: this.state.msg,
            image: 'https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg',
          })
          this.setState({ chat: [...this.chatItms] })
          this.scrollToBottom()
          this.setState({ msg: '' })
        }
      }
    })
    this.scrollToBottom()
  }
  onStateChange = (e) => {
    this.setState({ msg: e.target.value })
  }

  render() {
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <p>Tim Hover</p>
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
            {this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : 'me'}
                  msg={itm.msg}
                  image={itm.image}
                />
              )
            })}
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
            <input type="text" placeholder="Type a message here" onChange={this.onStateChange} value={this.state.msg} />
            <button className="btnSendMsg" id="sendMsgBtn">
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
}
