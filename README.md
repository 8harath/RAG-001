# 🤖 RAG QnA & Summarization Chatbot (Next.js)

A modern RAG (Retrieval-Augmented Generation) chatbot built with Next.js that allows you to upload documents, get AI-powered summaries, and ask questions about your content using Google's Gemini API.

## ✨ Features

- 📄 **Document Upload**: Support for TXT, PDF, DOCX, HTML, and Markdown files
- 🤖 **AI Summarization**: Get concise summaries using Gemini AI
- 💬 **Interactive Chat**: Ask questions about your uploaded documents with conversation history
- 🔍 **Vector Search**: Semantic search through your document content using ChromaDB
- 🎨 **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS
- ⚡ **Fast Performance**: Server-side rendering and optimized API routes

## 🚀 Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Google Gemini API**: Advanced AI/LLM for summarization and Q&A
- **ChromaDB**: Vector database for document storage and semantic search
- **Node.js**: Backend runtime environment

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key

## 🛠️ Local Development Setup

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd RAG-Chatbot
npm install
```

### 2. Environment Setup
```bash
# Copy template and edit with your API key
cp template.env .env.local
```

Edit `.env.local`:
```env
MODEL_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
MODEL_API_KEY=your_gemini_api_key_here
MODEL_NAME=gemini-2.0-flash-exp
CHROMA_COLLECTION_NAME=rag_collection
CHROMA_DB_PATH=./chroma_db
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Vercel Deployment

### Step 1: Get Your Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy the key for deployment

### Step 2: Deploy to Vercel

#### Option A: Deploy from GitHub
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Next.js project

#### Option B: Deploy with Vercel CLI
```bash
npm i -g vercel
vercel
```

### Step 3: Configure Environment Variables
In your Vercel project dashboard (Settings → Environment Variables):

```env
MODEL_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
MODEL_API_KEY=your_gemini_api_key_here
MODEL_NAME=gemini-2.0-flash-exp
CHROMA_COLLECTION_NAME=rag_collection
CHROMA_DB_PATH=./chroma_db
```

### Step 4: Redeploy
After setting environment variables, redeploy your application.

## 📖 How to Use

### 1. Upload Documents
- Navigate to the **Ingest** page
- Upload supported file types (TXT, PDF, DOCX, HTML, MD)
- Extract text from your documents

### 2. Generate Summaries
- Click "Generate Summary" to get AI-powered document summaries
- Review the key points extracted by Gemini AI

### 3. Ingest to Database
- Click "Ingest to Database" to store document chunks in ChromaDB
- This enables semantic search for the chatbot

### 4. Chat with Documents
- Go to the **Chat** page
- Ask questions about your uploaded documents
- View the retrieved context used for each answer
- Maintain conversation history

## 🏗️ Project Structure

```
RAG-Chatbot/
├── pages/
│   ├── api/           # API routes
│   │   ├── chat.ts
│   │   ├── extract-text.ts
│   │   ├── ingest.ts
│   │   └── summarize.ts
│   ├── _app.tsx       # App wrapper
│   ├── _document.tsx  # Document structure
│   ├── index.tsx      # Home page
│   ├── ingest.tsx     # Document upload page
│   └── chat.tsx       # Chat interface
├── components/
│   └── Layout.tsx     # Layout component
├── lib/
│   ├── genai-services.ts    # Gemini AI integration
│   ├── chroma-services.ts   # ChromaDB operations
│   └── text-utils.ts        # Text processing utilities
├── styles/
│   └── globals.css    # Global styles
└── public/            # Static assets
```

## 🔧 API Endpoints

- `POST /api/extract-text` - Extract text from uploaded files
- `POST /api/summarize` - Generate AI summaries
- `POST /api/ingest` - Store documents in vector database
- `POST /api/chat` - Process chat queries with RAG

## 🎯 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MODEL_API_KEY` | Your Gemini API key | Yes |
| `MODEL_BASE_URL` | Gemini API base URL | Yes |
| `MODEL_NAME` | Gemini model name | Yes |
| `CHROMA_COLLECTION_NAME` | ChromaDB collection name | Yes |
| `CHROMA_DB_PATH` | ChromaDB storage path | Yes |

## 🔍 Supported File Types

- `.txt` - Plain text files
- `.pdf` - PDF documents (basic extraction)
- `.docx` - Microsoft Word documents (basic extraction)
- `.html` - HTML files (tag removal)
- `.md` - Markdown files (formatting cleanup)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**API Key Errors**
- Ensure your Gemini API key is valid and set in environment variables
- Check API quotas and billing in Google AI Studio

**File Upload Issues**
- Verify file types are supported
- Check file size limits (10MB max)
- Ensure proper file permissions

**ChromaDB Errors**
- Verify write permissions in project directory
- Check if ChromaDB path is accessible
- Restart development server after changes

**Build Errors**
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

### Getting Help

1. Check the browser console for error messages
2. Verify all environment variables are correctly set
3. Ensure your Gemini API key has sufficient quota
4. Check the terminal/console for server-side errors

## 🎯 Future Enhancements

- [ ] Advanced PDF text extraction with proper libraries
- [ ] Support for more document formats
- [ ] Conversation memory and context retention
- [ ] Document management dashboard
- [ ] Multiple document collections
- [ ] Advanced search filters and options
- [ ] User authentication and document privacy
- [ ] Real-time collaboration features
- [ ] Export conversations and summaries
- [ ] Integration with more AI models

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Google Gemini AI](https://ai.google.dev/)
- [ChromaDB Documentation](https://docs.trychroma.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel Deployment](https://vercel.com/docs)
