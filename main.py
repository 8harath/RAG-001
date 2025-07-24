import streamlit as st

# Configure Streamlit for Vercel deployment
st.set_page_config(
    page_title="RAG QnA & Summarization Chatbot", 
    layout="wide",
    initial_sidebar_state="expanded"
)

# Add title and description
st.title("🤖 RAG QnA & Summarization Chatbot")
st.markdown("Upload documents, get summaries, and ask questions using Gemini AI!")

ingest_page = st.Page("pages/ingest_page.py", title="📄 Ingest Documents", icon="📄")
chatbot_page = st.Page("pages/chatbot_page.py", title="💬 Chatbot", icon="💬")

pg = st.navigation([
    ingest_page,
    chatbot_page
])

pg.run()
