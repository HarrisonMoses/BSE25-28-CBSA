"use client"

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

const AIAdvisor = () => {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I'm your AI Soil Advisor. How can I help you today with your soil management?",
      timestamp: new Date().toISOString(),
    },
  ])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim() === "") return

    // Add user message to chat
    const userMessage = {
      id: chatHistory.length + 1,
      sender: "user",
      text: message,
      timestamp: new Date().toISOString(),
    }

    setChatHistory([...chatHistory, userMessage])
    setMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Based on your soil data, I recommend increasing irrigation by 15% this week.",
        "Your nitrogen levels are optimal, but phosphorus is slightly low. Consider applying a phosphorus-rich fertilizer.",
        "The current soil moisture levels are within the ideal range for your crops.",
        "I've analyzed your farm data and noticed a potential pest risk due to recent weather patterns. Consider preventative measures.",
        "Your crop growth is on track. The next scheduled fertilization should be in 5 days.",
      ]

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]

      const aiMessage = {
        id: chatHistory.length + 2,
        sender: "ai",
        text: randomResponse,
        timestamp: new Date().toISOString(),
      }

      setChatHistory((prev) => [...prev, aiMessage])
    }, 1000)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="p-4 sm:ml-64">
        <Header />

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">AI Advisor</h1>
          <p className="text-gray-600">Get personalized recommendations for your farm management</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Chat header */}
          <div className="bg-indigo-600 text-white p-4">
            <div className="flex items-center">
              <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8 6a6 6 0 100-12 6 6 0 000 12zm1-5a1 1 0 11-2 0 1 1 0 012 0zm-3-4a1 1 0 00-1 1v3a1 1 0 002 0V8a1 1 0 00-1-1z"></path>
              </svg>
              <div>
                <h2 className="font-semibold">AgriSense AI Assistant</h2>
                <p className="text-xs text-indigo-200">Online</p>
              </div>
            </div>
          </div>

          {/* Chat messages */}
          <div className="p-4 h-96 overflow-y-auto">
            {chatHistory.map((msg) => (
              <div key={msg.id} className={`mb-4 ${msg.sender === "user" ? "text-right" : ""}`}>
                <div
                  className={`inline-block max-w-3xl p-4 rounded-lg ${
                    msg.sender === "user" ? "bg-indigo-100 text-gray-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
                <div className={`text-xs text-gray-500 mt-1 ${msg.sender === "user" ? "text-right" : ""}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            ))}
          </div>

          {/* Chat input */}
          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button type="submit" className="bg-indigo-600 text-white rounded-r-lg px-4 py-2 hover:bg-indigo-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAdvisor

