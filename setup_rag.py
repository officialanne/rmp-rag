from pinecone import Pinecone, ServerlessSpec
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Pinecone
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))


# Now do stuff
if 'rag' not in pc.list_indexes().names():
    pc.create_index(
        name='rag', 
        dimension=1536, 
        metric='cosine',
        spec=ServerlessSpec(
            cloud='aws',
            region='us-east-1'
        )
    )

# Load the review data
data = json.load(open("reviews.json"))

# Define hardcoded embeddings (use 1536-dimensional vectors)
def generate_hardcoded_embedding():
    # Example: return a list of 1536 zeros
    return [0.1] * 1536


# Prepare data for Pinecone with hardcoded embeddings
upserts = []
for review in data["reviews"]:
    embedding = generate_hardcoded_embedding()
    upserts.append({
        "id": review["professor"],
        "values": embedding,
        "metadata": {
            "review": review["review"],
            "subject": review["subject"],
            "stars": review["stars"]
        }
    })

index = pc.Index("rag")

# Insert the embeddings into the Pinecone index
index = pc.Index("rag")
upsert_response = index.upsert(
    vectors=upserts,
    namespace="ns1",
)
print(f"Upserted count: {upsert_response['upserted_count']}")

# Print index statistics
print(index.describe_index_stats())