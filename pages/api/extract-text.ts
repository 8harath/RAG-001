import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

// Disable bodyParser for this API route to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
}

// Simple text extraction function
async function extractTextFromFile(filePath: string, mimeType: string): Promise<string> {
  try {
    if (mimeType === 'text/plain' || path.extname(filePath) === '.txt') {
      return fs.readFileSync(filePath, 'utf-8')
    }
    
    if (mimeType === 'text/html' || path.extname(filePath) === '.html') {
      const content = fs.readFileSync(filePath, 'utf-8')
      // Basic HTML tag removal
      return content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    }
    
    if (path.extname(filePath) === '.md') {
      const content = fs.readFileSync(filePath, 'utf-8')
      // Basic markdown cleanup
      return content.replace(/#{1,6}\s+/g, '').replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1').trim()
    }
    
    // For other file types, try reading as text
    return fs.readFileSync(filePath, 'utf-8')
  } catch (error) {
    throw new Error(`Failed to extract text from file: ${error}`)
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const form = formidable({
      uploadDir: './tmp',
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    })

    // Ensure tmp directory exists
    if (!fs.existsSync('./tmp')) {
      fs.mkdirSync('./tmp', { recursive: true })
    }

    const [fields, files] = await form.parse(req)
    const file = Array.isArray(files.file) ? files.file[0] : files.file

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const extractedText = await extractTextFromFile(file.filepath, file.mimetype || '')
    
    // Clean up temp file
    fs.unlinkSync(file.filepath)
    
    if (!extractedText.trim()) {
      return res.status(400).json({ error: 'No text could be extracted from the file' })
    }

    res.status(200).json({ text: extractedText })
  } catch (error) {
    console.error('Error extracting text:', error)
    res.status(500).json({ error: 'Failed to extract text from file' })
  }
}
