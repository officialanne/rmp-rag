import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

// Load review data from reviews.json
const reviewsFilePath = path.resolve(process.cwd(), 'reviews.json');
const reviewsData = JSON.parse(fs.readFileSync(reviewsFilePath, 'utf-8'));

export async function POST(req) {
    try {
        const data = await req.json();
        const queryText = data[data.length - 1].content.toLowerCase();

        // Function to find matching reviews based on query
        const findMatchingReviews = (query) => {
            return reviewsData.reviews.filter(review =>
                review.review.toLowerCase().includes(query) ||
                review.subject.toLowerCase().includes(query)
            );
        };

        // Find matching reviews
        const matchingReviews = findMatchingReviews(queryText);

        // Format the response
        let resultString = matchingReviews.length > 0
            ? 'Here are some professor reviews that might help:\n\n'
            : 'No matching reviews found.\n\n';

        matchingReviews.forEach((review) => {
            resultString += `
            \nProfessor: ${review.professor}
            \nReview: ${review.review}
            \nSubject: ${review.subject} 
            \nStars: ${review.stars}
            \n\n`;
        });

        // Return the response directly
        return NextResponse.json({ role: 'assistant', content: resultString });
    } catch (error) {
        console.error('Error handling the request:', error);
        return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
    }
}
