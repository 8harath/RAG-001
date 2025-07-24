import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'

interface Message {
  role: 'user' | 'assistant'
  content: string
  context?: string[]
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👋 Hi! I\'m your RAG chatbot. I can answer questions about documents you\'ve uploaded. What would you like to know?'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input }),
      })

      if (response.ok) {
        const data = await response.json()
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.answer,
          context: data.context
        }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        const errorMessage: Message = {
          role: 'assistant',
          content: '❌ Sorry, I encountered an error while processing your question. Please try again.'
        }
        setMessages(prev => [...prev, errorMessage])
      }
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: '❌ Sorry, I encountered an error while processing your question. Please try again.'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: '👋 Chat history cleared! What would you like to know about your documents?'
      }
    ])
  }

  return (
    <>
      <Head>
        <title>Chat - RAG Chatbot</title>
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="py-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold">💬 RAG QnA Chatbot</h1>
                  <p className="text-gray-600">🤖 Ask questions about your ingested documents! Powered by Gemini AI.</p>
                </div>
                <button
                  onClick={clearChat}
                  className="btn-secondary"
                >
                  🗑️ Clear Chat
                </button>
              </div>

              {/* Chat Messages */}
              <div className="bg-white rounded-lg shadow-md h-96 overflow-y-auto mb-6 p-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index}>
                      <div className={`chat-message ${message.role}`}>
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            {message.role === 'user' ? '👤' : '🤖'}
                          </div>
                          <div className="flex-1">
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Show context if available */}
                      {message.context && message.context.length > 0 && (
                        <details className="mt-2 p-3 bg-gray-50 rounded-lg text-sm">
                          <summary className="cursor-pointer font-medium text-gray-700">
                            📚 View Retrieved Context ({message.context.length} chunks)
                          </summary>
                          <div className="mt-2 space-y-2">
                            {message.context.map((chunk, idx) => (
                              <div key={idx} className="p-2 bg-white rounded border-l-2 border-blue-200">
                                <p className="text-xs text-gray-500 mb-1">Chunk {idx + 1}:</p>
                                <p className="text-gray-700">{chunk}</p>
                              </div>
                            ))}
                          </div>
                        </details>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="chat-message assistant">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">🤖</div>
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          <span>🔍 Searching documents and generating answer...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSubmit} className="flex space-x-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="💭 Ask me anything about your documents..."
                  className="input-field flex-1"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="btn-primary px-6"
                >
                  {isLoading ? '⏳' : '📤'} Send
                </button>
              </form>

              {/* Instructions */}
              <div className="mt-8 card">
                <h2 className="text-xl font-semibold mb-4">ℹ️ How it works</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Upload</strong> documents in the Ingest page</li>
                  <li><strong>Ask questions</strong> about your documents</li>
                  <li><strong>Get answers</strong> powered by Gemini AI</li>
                  <li><strong>See context</strong> that was used for the answer</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
