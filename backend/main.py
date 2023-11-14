from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests  # Ensure this package is installed

class ArtRequest(BaseModel):
    prompt: str

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)
@app.post("/generate-art")
async def generate_art(request: ArtRequest):
    try:
        # Replace with the actual Jarvis Labs API endpoint
        jarvis_api_endpoint = "https://2cf75547964fe0da24b80ad16b9ecaavs.notebooksa.jarvislabs.net/proxy/6006/generate-image"
        
        # Replace with your actual API key or authentication token
        api_key = "your_api_key"

        # Prepare the request payload
        payload = {
            "prompt": request.prompt,
            # Add other parameters as required by the Jarvis Labs API
        }

        # Include headers for authentication if required
        headers = {
            "Authorization": f"Bearer {api_key}"
        }

        # Sending a request to Jarvis Labs
        response = requests.post(jarvis_api_endpoint, json=payload)

        # Check if the request was successful
        if response.status_code == 200:
            # Process the response
            generated_art_url = response.json().get("image_url")
            return {"image_url": generated_art_url}
        else:
            # Handle errors or unsuccessful responses
            return {"error": "Failed to generate art", "details": response.text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating art: {str(e)}")

# Add more endpoints or logic as needed
