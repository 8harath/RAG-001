import { NextApiRequest, NextApiResponse } from 'next'
import { chunkText } from '../../lib/text-utils'
import { ingestDocuments } from '../../lib/chroma-services'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { text } = req.body

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' })
    }

    // Chunk the text
    const chunks = chunkText(text)
    
    if (chunks.length === 0) {
      return res.status(400).json({ error: 'No chunks could be created from the text' })
    }

    // Ingest into ChromaDB
    const numChunks = await ingestDocuments(chunks)
    
    res.status(200).json({ chunks: numChunks })
  } catch (error) {
    console.error('Error ingesting document:', error)
    res.status(500).json({ error: 'Failed to ingest document' })
  }
}
