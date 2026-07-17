import os
from flask import Flask, request
from flask_cors import CORS 
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

supabase: Client = create_client(
    os.environ.get("SUPABASE_URL"),
    os.environ.get("SUPABASE_KEY")
)

@app.get("/")
def health_check():
    return {"message": "API is running!"}

@app.get("/api/study-library")
def get_resources():
    response = supabase.table("study_resources").select("*").execute()
    return response.data

@app.post("/api/study-library")
def create_resource():
    data = request.get_json()

    if not data:
        return {"error": "Request body must be JSON"}, 400
    
    if "title" not in data or "description" not in data or "category" not in data:
        return {"error": "title, description, and category are required"}, 400

    response = supabase.table("study_resources").insert(data).execute()
    return response.data[0], 201

@app.patch("/api/study-library/<int:resource_id>")
def update_resource(resource_id):
    data = request.get_json()

    if not data:
        return {"error": "Request body must be JSON"}, 400
    
    response = supabase.table("study_resources").update(data).eq("id", resource_id).execute()

    if not response.data:
        return {"error": "Resource not found"}, 404
    
    return response.data[0]

@app.delete("/api/study-library/<int:resource_id>")
def delete_resource(resource_id):
    response = supabase.table("study_resources").delete().eq("id", resource_id).execute()

    if not response.data:
        return {"error": "Resource not found"}, 404
    
    return response.data[0]