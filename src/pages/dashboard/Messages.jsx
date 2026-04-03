import React from 'react'
import Message from '../../components/dashboard/message'
import '../../styles/messages.css'
import '../../styles/homedashboard.css'

export default function Messages(){
  return (
    <>
      {/* Messages Header */}
      <div className="messages-page-header">
        <div className="messages-header-content">
          <h1 className="messages-main-title">Messages</h1>
          <p className="messages-tagline">Stay connected with your drivers and support team</p>
        </div>
      </div>

      {/* Messages Content */}
      <div className={`messages-page-wrapper`}>
        <Message />
      </div>
    </>
  )
}
