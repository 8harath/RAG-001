import streamlit as st
from markitdown import MarkItDown
from genai_services import summarize_text, chunk_text
from chroma_services import ingest_documents
import tempfile
import os

st.title("📄 Document Ingestion & Summarization")
st.markdown("Upload your documents and get AI-powered summaries using Gemini!")

# File uploader with better styling
uploaded_file = st.file_uploader(
    "📁 Choose a document to upload",
    type=["txt", "pdf", "md", "html", "docx"],
    help="Supported formats: TXT, PDF, Markdown, HTML, DOCX"
)

if uploaded_file:
    # Display file info
    st.info(f"📋 **File:** {uploaded_file.name} ({uploaded_file.size} bytes)")
    
    try:
        # Save to temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(uploaded_file.name)[1]) as tmp:
            tmp.write(uploaded_file.read())
            tmp_path = tmp.name

        # Convert to text using markitdown
        with st.spinner("📖 Extracting text from document..."):
            converter = MarkItDown()
            doc_text = converter.convert(tmp_path).text_content
        
        if doc_text.strip():
            st.subheader("📝 Document Preview")
            st.text_area("Extracted Text", doc_text[:1000] + "..." if len(doc_text) > 1000 else doc_text, height=200)

            # Summarize
            if st.button("✨ Generate Summary", type="primary"):
                with st.spinner("🤖 Generating summary with Gemini AI..."):
                    summary = summarize_text(doc_text)
                st.subheader("📋 Summary")
                st.markdown(summary)
                
                # Store summary in session state
                st.session_state['summary'] = summary
                st.session_state['doc_text'] = doc_text

            # Show summary if it exists
            if 'summary' in st.session_state:
                st.subheader("📋 Summary")
                st.markdown(st.session_state['summary'])

            # Upload button
            col1, col2 = st.columns(2)
            with col1:
                if st.button("📤 Upload & Ingest to Vector DB", type="primary"):
                    with st.spinner("🔄 Processing and ingesting document..."):
                        chunks = chunk_text(doc_text)
                        num_chunks = ingest_documents(chunks)
                        if num_chunks > 0:
                            st.success(f"✅ Successfully ingested {num_chunks} chunks!")
                            st.balloons()
            
            with col2:
                if st.button("💬 Go to Chatbot"):
                    st.switch_page("pages/chatbot_page.py")
        else:
            st.error("❌ Could not extract text from the document. Please try a different file.")
            
        # Clean up temp file
        os.unlink(tmp_path)
        
    except Exception as e:
        st.error(f"❌ Error processing document: {str(e)}")

else:
    st.markdown("""
    ### 🚀 How to use:
    1. **Upload** a document using the file uploader above
    2. **Preview** the extracted text content
    3. **Generate** an AI summary using Gemini
    4. **Ingest** the document into the vector database
    5. **Chat** with your document using the chatbot
    
    ### 📚 Supported file types:
    - 📄 Text files (.txt)
    - 📄 PDF documents (.pdf)
    - 📝 Markdown files (.md)
    - 🌐 HTML files (.html)
    - 📝 Word documents (.docx)
    """)
