# 🤖 RAG QnA & Summarization Chatbot

A powerful RAG (Retrieval-Augmented Generation) chatbot that allows you to upload documents, get AI-powered summaries, and ask questions about your content using Google's Gemini API.

## ✨ Features

- 📄 **Document Upload**: Support for TXT, PDF, DOCX, HTML, and Markdown files
- 🤖 **AI Summarization**: Get concise summaries using Gemini AI
- 💬 **Interactive Chat**: Ask questions about your uploaded documents
- 🔍 **Vector Search**: Semantic search through your document content
- 🎨 **Modern UI**: Clean, intuitive Streamlit interface

## 🚀 Technologies Used

- **Streamlit**: Web interface
- **Google Gemini API**: AI/LLM for summarization and Q&A
- **ChromaDB**: Vector database for document storage
- **MarkItDown**: Document text extraction
- **Tiktoken**: Text chunking and token counting

## 📋 Prerequisites

- Python 3.8+
- Google Gemini API key

## 🛠️ Local Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd RAG-Chatbot
   ```

2. **Create virtual environment**
   ```bash
   python -m venv .venv
   # Windows
   .venv\Scripts\activate
   # Mac/Linux
   source .venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   # Copy template and edit with your API key
   cp template.env .env
   ```
   
   Edit `.env` file:
   ```env
   MODEL_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
   MODEL_API_KEY=your_gemini_api_key_here
   MODEL_NAME=gemini-2.0-flash-exp
   CHROMA_COLLECTION_NAME=rag_collection
   ```

5. **Run the application**
   ```bash
   streamlit run main.py
   ```

## 🌐 Vercel Deployment

### Step 1: Get Your Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy the key for later use

### Step 2: Deploy to Vercel
1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Python project

3. **Set Environment Variables**
   In your Vercel project dashboard:
   - Go to Settings → Environment Variables
   - Add these variables:
     ```
     MODEL_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
     MODEL_API_KEY=your_gemini_api_key_here
     MODEL_NAME=gemini-2.0-flash-exp
     CHROMA_COLLECTION_NAME=rag_collection
     ```

4. **Redeploy**
   - Go to Deployments tab
   - Click on the latest deployment
   - Click "Redeploy"

## 📖 How to Use

1. **Upload Documents**: Go to the "Ingest Documents" page and upload your files
2. **Get Summary**: Generate AI-powered summaries of your documents
3. **Ingest to Database**: Store your documents in the vector database
4. **Ask Questions**: Switch to the "Chatbot" page and ask questions about your documents
5. **Get Answers**: Receive contextual answers powered by Gemini AI

## 🔧 Configuration

### Environment Variables
- `MODEL_BASE_URL`: Gemini API base URL
- `MODEL_API_KEY`: Your Gemini API key
- `MODEL_NAME`: Gemini model to use (default: gemini-2.0-flash-exp)
- `CHROMA_COLLECTION_NAME`: ChromaDB collection name

### Supported File Types
- `.txt` - Plain text files
- `.pdf` - PDF documents
- `.docx` - Microsoft Word documents
- `.html` - HTML files
- `.md` - Markdown files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **API Key Error**: Make sure your Gemini API key is correctly set in environment variables
2. **Import Errors**: Ensure all dependencies are installed with `pip install -r requirements.txt`
3. **File Upload Issues**: Check that your file format is supported
4. **ChromaDB Issues**: The database is created automatically; ensure write permissions in the project directory

### Getting Help

If you encounter issues:
1. Check the console/terminal for error messages
2. Verify your API key is valid and has quota
3. Ensure all environment variables are set correctly
4. Check that your file uploads are in supported formats

## 🎯 Future Enhancements

- [ ] Support for more file types
- [ ] Conversation memory
- [ ] Document management interface
- [ ] Multiple document collections
- [ ] Export chat history
- [ ] Advanced search filters
