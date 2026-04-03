import React from 'react'
import { useOutletContext } from 'react-router-dom'
import Message from '../../components/dashboard/message'
import '../../styles/messages.css'
import '../../styles/homedashboard.css'

export default function Messages(){
  const { collapsed } = useOutletContext() || { collapsed: false }
  
  return (
    <>
      {/* Messages Header */}
      <div className={`messages-page-header ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="messages-header-content">
          <h1 className="messages-main-title">Messages</h1>
          <p className="messages-tagline">Stay connected with your drivers and support team</p>
        </div>
      </div>

      {/* Messages Content */}
      <div className={`messages-page-wrapper ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <Message collapsed={collapsed} />
      </div>
    </>
  )
}
