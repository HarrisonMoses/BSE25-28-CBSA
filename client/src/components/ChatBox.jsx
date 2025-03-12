"use client"

import { useState } from "react"

const ChatBox = ({ title, initialMessage }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: initialMessage,
      sender: "ai",
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
    }

    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: "I'll analyze your farm data and provide recommendations shortly. Is there anything specific you'd like to know?",
        sender: "ai",
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div
      className={`fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${isOpen ? "h-96" : "h-12"}`}
    >
      {/* Header */}
      <div
        className="bg-black text-white p-3 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8 6a6 6 0 100-12 6 6 0 000 12zm1-5a1 1 0 11-2 0 1 1 0 012 0zm-3-4a1 1 0 00-1 1v3a1 1 0 002 0V8a1 1 0 00-1-1z"></path>
          </svg>
          <span className="font-medium">{title}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
        >
          {isOpen ? (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
            </svg>
          )}
        </button>
      </div>

      {/* Chat messages */}
      {isOpen && (
        <>
          <div className="p-3 h-64 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className={`mb-3 ${message.sender === "user" ? "text-right" : ""}`}>
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.sender === "user" ? "bg-indigo-100 text-gray-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input area */}
          <form onSubmit={handleSendMessage} className="border-t p-3 flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <button type="submit" className="bg-black text-white rounded-r-lg px-4 py-2 hover:bg-gray-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default ChatBox

