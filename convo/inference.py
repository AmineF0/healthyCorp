from langchain_nvidia_ai_endpoints import ChatNVIDIA
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("API_KEY")

client = ChatNVIDIA(
  model="meta/llama-3.1-405b-instruct",
  api_key=api_key, 
  temperature=0.2,
  top_p=0.7,
  max_tokens=1024,
)

for chunk in client.stream([{"role":"user","content":"Generate an entire document about ISO 14001 ( definitions and requirements)"}]): 
  print(chunk.content, end="")

  
