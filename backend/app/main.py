from fastapi import FastAPI
import requests

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Energy Trading API Running"}

@app.get("/market-data")
def market_data():
    url = "https://api.gridstatus.io/v1/markets"  # example API
    response = requests.get(url)
    return response.json()
