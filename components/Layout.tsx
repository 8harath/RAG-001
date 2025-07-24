import Link from 'next/link'
import { useRouter } from 'next/router'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()

  const isActive = (path: string) => {
    return router.pathname === path
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-primary">
              🤖 RAG Chatbot
            </Link>
            
            <div className="flex space-x-4">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isActive('/') 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                🏠 Home
              </Link>
              <Link
                href="/ingest"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isActive('/ingest') 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                📄 Ingest
              </Link>
              <Link
                href="/chat"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isActive('/chat') 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                💬 Chat
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">🤖 RAG QnA & Summarization Chatbot</p>
          <p className="text-gray-400">Powered by Gemini AI & Next.js</p>
        </div>
      </footer>
    </div>
  )
}
