from fastapi import FastAPI
import requests
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
print("Current Directory:", os.getcwd())
print("Environment File Exists:", os.path.exists(".env"))



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv(dotenv_path="./.env")


# API Key and URL
API_KEY = os.getenv("API_KEY")

API_URL = f"https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey={API_KEY}"

@app.get("/data")
def get_data():
    
    try:
        response = requests.get(API_URL)
        if response.status_code == 200:
            return response.json()
        else:
            return {"error": f"Failed to fetch data. Status code: {response.status_code}"}
    except Exception as e:
        return {"error": str(e)}
