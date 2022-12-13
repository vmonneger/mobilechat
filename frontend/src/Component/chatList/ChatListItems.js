import React, { Component } from 'react'
import Avatar from './Avatar'

export default class ChatListItems extends Component {
  constructor(props) {
    super(props)
  }
  selectChat = (e) => {
    // this.props.isClick(true)
    for (let index = 0; index < e.currentTarget.parentNode.children.length; index++) {
      e.currentTarget.parentNode.children[index].classList.remove('active')
    }
    e.currentTarget.classList.add('active')
    // this.props.isClick(false)
    this.props.redirectionChatRoom(this.props.userId)
  }

  handleOnClick = () => {
    this.selectChat()
    console.log('ljdp')
    // this.props.redirectionChatRoom(this.props.key)
  }

  render() {
    return (
      <div
        style={{ animationDelay: `0.${this.props.animationDelay}s` }}
        onClick={this.selectChat}
        className={`chatlist__item ${this.props.active ? this.props.active : ''} `}
      >
        <Avatar
          image={this.props.image ? this.props.image : 'http://placehold.it/80x80'}
          isOnline={this.props.isOnline}
        />

        <div className="userMeta">
          <p>{this.props.name}</p>
        </div>
      </div>
    )
  }
}
