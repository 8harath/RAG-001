import OpenAI from 'openai'

// Initialize OpenAI client with Gemini API configuration
const openai = new OpenAI({
  apiKey: process.env.MODEL_API_KEY || '',
  baseURL: process.env.MODEL_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/openai/',
})

export interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function callLLM(messages: Message[]): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: process.env.MODEL_NAME || 'gemini-2.0-flash-exp',
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    })

    return response.choices[0]?.message?.content || 'No response generated'
  } catch (error) {
    console.error('Error calling Gemini API:', error)
    throw new Error('Failed to call Gemini API')
  }
}

export async function summarizeText(text: string): Promise<string> {
  const messages: Message[] = [
    {
      role: 'system',
      content: 'You are a helpful assistant that summarizes documents accurately and concisely.'
    },
    {
      role: 'user',
      content: `Please summarize the following text concisely while capturing the key points:\n\n${text}`
    }
  ]

  return await callLLM(messages)
}

export async function answerWithContext(question: string, contexts: string[]): Promise<string> {
  const combinedContext = contexts.join('\n\n---\n\n')

  const messages: Message[] = [
    {
      role: 'system',
      content: 'You are a helpful assistant that answers questions based on the provided context. If you don\'t know the answer based on the context, say so.'
    },
    {
      role: 'user',
      content: `Context information:\n\n${combinedContext}\n\nQuestion: ${question}\n\nAnswer:`
    }
  ]

  return await callLLM(messages)
}
