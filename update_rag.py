#run to update with new data in new_reviews.json


from pinecone import Pinecone
import json
import os
from dotenv import load_dotenv
import random

# Load environment variables
load_dotenv()

# Initialize Pinecone
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

# Connect to the Pinecone index
index_name = 'rag'
index = pc.Index(index_name)

# Load review data
data = json.load(open("new_reviews.json"))  # Use a different file or the same depending on your needs

# Define function to generate random embeddings (for example purposes)
def generate_random_embedding(dimension=1536):
    return [random.uniform(0, 1) for _ in range(dimension)]  # Generate random values

# Prepare and upsert new data
upserts = []
for review in data["reviews"]:
    embedding = generate_random_embedding()
    upserts.append({
        "id": review["professor"],  # Ensure IDs are unique or handle conflicts
        "values": embedding,
        "metadata": {
            "review": review["review"],
            "subject": review["subject"],
            "stars": review["stars"]
        }
    })

upsert_response = index.upsert(vectors=upserts, namespace="ns1")
print(f"Upserted count: {upsert_response['upserted_count']}")
print(index.describe_index_stats())
