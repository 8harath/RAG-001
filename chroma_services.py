import chromadb
import os
import streamlit as st
from datetime import datetime

from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")

# Initialize ChromaDB with error handling
try:
    chroma_client = chromadb.PersistentClient(path="./chroma_db")
    collection = chroma_client.get_or_create_collection(
        name=os.getenv("CHROMA_COLLECTION_NAME", "rag_collection")
    )
except Exception as e:
    st.error(f"Error initializing ChromaDB: {str(e)}")
    collection = None


def ingest_documents(docs):
    """Ingest documents into ChromaDB using 'all-MiniLM-L6-v2' Sentence Transformer

    Args:
        docs: list of strings (document chunks)
    
    Returns:
        Number of documents ingested
    """
    if not collection:
        st.error("ChromaDB collection not initialized")
        return 0
    
    try:
        # Generate unique IDs with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        ids = [f"chunk_{timestamp}_{i}" for i in range(len(docs))]

        # Ingest chunks into the collection
        collection.add(documents=docs, ids=ids)
        
        st.success(f"Successfully ingested {len(docs)} document chunks!")
        return len(docs)
    except Exception as e:
        st.error(f"Error ingesting documents: {str(e)}")
        return 0


def query_documents(query_text, n_results=3):
    """Query the collection for relevant documents

    Args:
        query_text: string to search for
        n_results: number of results to return

    Returns:
        List of relevant document chunks
    """
    if not collection:
        st.error("ChromaDB collection not initialized")
        return []
    
    try:
        results = collection.query(query_texts=[query_text], n_results=n_results)
        if 'documents' in results and results['documents']:
            return results['documents'][0]
        else:
            return []
    except Exception as e:
        st.error(f"Error querying documents: {str(e)}")
        return []
