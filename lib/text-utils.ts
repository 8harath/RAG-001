import { encode } from 'gpt-tokenizer'

export function chunkText(text: string, chunkSize: number = 100, chunkOverlap: number = 10): string[] {
  if (!text) {
    return []
  }

  try {
    // Use gpt-tokenizer to count tokens
    const tokens = encode(text)
    
    // Create chunks with overlap
    const chunks: string[] = []
    let i = 0
    
    while (i < tokens.length) {
      // Get chunk of size chunkSize
      const chunkEnd = Math.min(i + chunkSize, tokens.length)
      const chunkTokens = tokens.slice(i, chunkEnd)
      
      // Decode tokens back to text
      // For simplicity, we'll split by characters instead of proper token decoding
      const chunkText = text.substring(
        Math.floor((i / tokens.length) * text.length),
        Math.floor((chunkEnd / tokens.length) * text.length)
      )
      
      chunks.push(chunkText)
      
      // Move with overlap
      i = chunkEnd - chunkOverlap
      if (chunkEnd >= tokens.length) break
    }
    
    return chunks.filter(chunk => chunk.trim().length > 0)
  } catch (error) {
    // Fallback to simple character-based chunking
    console.warn('Token-based chunking failed, using character-based fallback')
    return simpleChunkText(text, chunkSize * 4, chunkOverlap * 4) // Approximate 4 chars per token
  }
}

function simpleChunkText(text: string, chunkSize: number, chunkOverlap: number): string[] {
  const chunks: string[] = []
  let i = 0
  
  while (i < text.length) {
    const chunkEnd = Math.min(i + chunkSize, text.length)
    chunks.push(text.substring(i, chunkEnd))
    i = chunkEnd - chunkOverlap
    if (chunkEnd >= text.length) break
  }
  
  return chunks.filter(chunk => chunk.trim().length > 0)
}
