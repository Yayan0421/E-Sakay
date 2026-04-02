import React from 'react'
import Message from '../../components/dashboard/message'

export default function Messages(){
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-sm text-gray-500 mt-1">Chat with drivers and support team</p>
      </div>
      <Message />
    </div>
  )
}
