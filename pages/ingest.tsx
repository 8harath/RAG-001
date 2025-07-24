import { useState, useRef } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'

export default function Ingest() {
  const [file, setFile] = useState<File | null>(null)
  const [extractedText, setExtractedText] = useState('')
  const [summary, setSummary] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setExtractedText('')
      setSummary('')
    }
  }

  const handleExtractText = async () => {
    if (!file) return

    setIsProcessing(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/extract-text', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setExtractedText(data.text)
      } else {
        alert('Error extracting text from file')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error extracting text from file')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSummarize = async () => {
    if (!extractedText) return

    setIsProcessing(true)
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: extractedText }),
      })

      if (response.ok) {
        const data = await response.json()
        setSummary(data.summary)
      } else {
        alert('Error generating summary')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error generating summary')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleIngest = async () => {
    if (!extractedText) return

    setIsUploading(true)
    try {
      const response = await fetch('/api/ingest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: extractedText }),
      })

      if (response.ok) {
        const data = await response.json()
        alert(`Successfully ingested ${data.chunks} chunks!`)
      } else {
        alert('Error ingesting document')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error ingesting document')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Document Ingestion - RAG Chatbot</title>
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-3xl font-bold text-center mb-8">📄 Document Ingestion & Summarization</h1>
            <p className="text-center text-gray-600 mb-8">Upload your documents and get AI-powered summaries using Gemini!</p>

            {/* File Upload Section */}
            <div className="card mb-8">
              <h2 className="text-xl font-semibold mb-4">📁 Upload Document</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.pdf,.docx,.html,.md"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {!file ? (
                  <div>
                    <div className="text-4xl mb-4">📄</div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-primary mb-4"
                    >
                      Choose File
                    </button>
                    <p className="text-gray-500">Supported formats: TXT, PDF, DOCX, HTML, MD</p>
                  </div>
                ) : (
                  <div>
                    <div className="text-4xl mb-4">✅</div>
                    <p className="font-semibold mb-2">{file.name}</p>
                    <p className="text-gray-500 mb-4">{(file.size / 1024).toFixed(2)} KB</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-secondary mr-4"
                    >
                      Change File
                    </button>
                    <button
                      onClick={handleExtractText}
                      disabled={isProcessing}
                      className="btn-primary"
                    >
                      {isProcessing ? '📖 Extracting...' : '📖 Extract Text'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Extracted Text Section */}
            {extractedText && (
              <div className="card mb-8">
                <h2 className="text-xl font-semibold mb-4">📝 Extracted Text</h2>
                <textarea
                  value={extractedText.slice(0, 1000) + (extractedText.length > 1000 ? '...' : '')}
                  readOnly
                  className="w-full h-40 p-3 border border-gray-300 rounded-lg bg-gray-50"
                />
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={handleSummarize}
                    disabled={isProcessing}
                    className="btn-primary"
                  >
                    {isProcessing ? '🤖 Summarizing...' : '✨ Generate Summary'}
                  </button>
                  <button
                    onClick={handleIngest}
                    disabled={isUploading}
                    className="btn-secondary"
                  >
                    {isUploading ? '📤 Ingesting...' : '📤 Ingest to Database'}
                  </button>
                </div>
              </div>
            )}

            {/* Summary Section */}
            {summary && (
              <div className="card mb-8">
                <h2 className="text-xl font-semibold mb-4">📋 AI Summary</h2>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-800">{summary}</p>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">🚀 How to use</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li><strong>Upload</strong> a document using the file uploader above</li>
                <li><strong>Extract</strong> text content from your document</li>
                <li><strong>Generate</strong> an AI summary using Gemini</li>
                <li><strong>Ingest</strong> the document into the vector database</li>
                <li><strong>Chat</strong> with your document using the chatbot</li>
              </ol>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
