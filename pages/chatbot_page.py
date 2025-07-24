import streamlit as st
from genai_services import answer_with_context
from chroma_services import query_documents

st.title("💬 RAG QnA Chatbot")
st.markdown("🤖 Ask questions about your ingested documents! Powered by Gemini AI.")

# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = []
    st.session_state.messages.append({
        "role": "assistant", 
        "content": "👋 Hi! I'm your RAG chatbot. I can answer questions about documents you've uploaded. What would you like to know?"
    })

# Display chat messages from history on app rerun
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# React to user input
if prompt := st.chat_input("💭 Ask me anything about your documents..."):
    # Display user message in chat message container
    st.chat_message("user").markdown(prompt)
    # Add user message to chat history
    st.session_state.messages.append({"role": "user", "content": prompt})

    with st.chat_message("assistant"):
        with st.spinner("🔍 Searching documents and generating answer..."):
            # Query Chroma for context
            context_chunks = query_documents(prompt, n_results=3)
            
            if context_chunks:
                # Generate answer with context
                answer = answer_with_context(prompt, context_chunks)
                st.markdown(answer)
                
                # Show retrieved context in an expander
                with st.expander("📚 View Retrieved Context"):
                    for i, chunk in enumerate(context_chunks, 1):
                        st.markdown(f"**Chunk {i}:**")
                        st.markdown(f"```\n{chunk}\n```")
                        st.divider()
            else:
                answer = "❌ I couldn't find any relevant information in your uploaded documents. Please make sure you have uploaded and ingested documents first."
                st.markdown(answer)
    
    # Add assistant response to chat history
    st.session_state.messages.append({"role": "assistant", "content": answer})

# Sidebar with helpful information
with st.sidebar:
    st.header("ℹ️ How it works")
    st.markdown("""
    1. **Upload** documents in the Ingest page
    2. **Ask questions** about your documents
    3. **Get answers** powered by Gemini AI
    4. **See context** that was used for the answer
    """)
    
    if st.button("🗑️ Clear Chat History"):
        st.session_state.messages = []
        st.session_state.messages.append({
            "role": "assistant", 
            "content": "👋 Chat history cleared! What would you like to know about your documents?"
        })
        st.rerun()
    
    if st.button("📄 Go to Document Ingestion"):
        st.switch_page("pages/ingest_page.py")
