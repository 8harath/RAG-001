import { ChromaClient } from 'chromadb'

let client: ChromaClient | null = null
let collection: any = null

export async function initializeChroma() {
  if (!client) {
    client = new ChromaClient({
      path: process.env.CHROMA_DB_PATH || './chroma_db'
    })
    
    collection = await client.getOrCreateCollection({
      name: process.env.CHROMA_COLLECTION_NAME || 'rag_collection'
    })
  }
  
  return { client, collection }
}

export async function ingestDocuments(docs: string[]): Promise<number> {
  try {
    const { collection } = await initializeChroma()
    
    // Generate unique IDs with timestamp
    const timestamp = Date.now()
    const ids = docs.map((_, i) => `chunk_${timestamp}_${i}`)
    
    // Ingest chunks into the collection
    await collection.add({
      documents: docs,
      ids: ids
    })
    
    return docs.length
  } catch (error) {
    console.error('Error ingesting documents:', error)
    throw new Error('Failed to ingest documents')
  }
}

export async function queryDocuments(queryText: string, nResults: number = 3): Promise<string[]> {
  try {
    const { collection } = await initializeChroma()
    
    const results = await collection.query({
      queryTexts: [queryText],
      nResults: nResults
    })
    
    if (results.documents && results.documents[0]) {
      return results.documents[0]
    }
    
    return []
  } catch (error) {
    console.error('Error querying documents:', error)
    throw new Error('Failed to query documents')
  }
}
