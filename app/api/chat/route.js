import { NextResponse } from 'next/server'
import { Pinecone } from '@pinecone-database/pinecone'
import fetch from 'node-fetch';  // Ensure fetch is available in the environment
import 'isomorphic-fetch';

export async function POST(req) {
    const data = await req.json()

    // Set up Pinecone connection
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    })
    const index = pc.index('rag').namespace('ns1')

    // Extract the user’s question
    const text = data[data.length - 1].content.toLowerCase()

    // Use a simple query to find matching professor reviews in Pinecone
    const results = await index.query({
        topK: 3,
        includeMetadata: true,
        vector: [0],  // Simple query since we don't have embeddings
    })

    // Process the Pinecone results into a readable string
    let resultString = `Here are some professor reviews that might help:\n\n`
    results.matches.forEach((match) => {
        resultString += `
        Professor: ${match.id}
        Review: ${match.metadata.review}
        Subject: ${match.metadata.subject}
        Stars: ${match.metadata.stars}
        \n\n`
    })

    // Return the response directly
    return NextResponse.json({role: 'assistant', content: resultString})
}
