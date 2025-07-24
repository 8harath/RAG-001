import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>RAG Chatbot - Home</title>
        <meta name="description" content="RAG QnA & Summarization Chatbot" />
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4 py-16">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                🤖 RAG QnA & Summarization Chatbot
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Upload your documents, get AI-powered summaries, and ask questions about your content using Google's Gemini API.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="card text-center">
                <div className="text-4xl mb-4">📄</div>
                <h3 className="text-lg font-semibold mb-2">Document Upload</h3>
                <p className="text-gray-600">Support for PDF, DOCX, TXT, HTML, and Markdown files</p>
              </div>
              
              <div className="card text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-lg font-semibold mb-2">AI Summarization</h3>
                <p className="text-gray-600">Get concise summaries using Gemini AI</p>
              </div>
              
              <div className="card text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-lg font-semibold mb-2">Interactive Chat</h3>
                <p className="text-gray-600">Ask questions about your uploaded documents</p>
              </div>
              
              <div className="card text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold mb-2">Vector Search</h3>
                <p className="text-gray-600">Semantic search through your document content</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ingest" className="btn-primary text-center py-3 px-6 text-lg">
                📤 Upload Documents
              </Link>
              <Link href="/chat" className="btn-secondary text-center py-3 px-6 text-lg">
                💬 Start Chatting
              </Link>
            </div>

            {/* How it Works */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">1</div>
                  <h3 className="font-semibold mb-2">Upload</h3>
                  <p className="text-gray-600">Upload your documents</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">2</div>
                  <h3 className="font-semibold mb-2">Process</h3>
                  <p className="text-gray-600">AI processes and summarizes</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">3</div>
                  <h3 className="font-semibold mb-2">Store</h3>
                  <p className="text-gray-600">Content stored in vector database</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">4</div>
                  <h3 className="font-semibold mb-2">Chat</h3>
                  <p className="text-gray-600">Ask questions and get answers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
