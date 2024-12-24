import json
import os
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from collections import Counter, defaultdict

# Initialize the NVIDIA AI client
client = ChatNVIDIA(
    model="meta/llama-3.1-405b-instruct",
    api_key="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",
    temperature=0.2, 
    top_p=0.7,
    max_tokens=1024,
)

# Input and output file paths
input_path = "/conversations"
output_path = "sentiment_profiles.json"

# Load input JSON from file with UTF-8 encoding
try:
    with open(input_path, 'r', encoding='utf-8') as f:
        conversation_pairs = json.load(f)
except FileNotFoundError:
    print(f"Input file not found at {input_path}")
    exit(1)
except json.JSONDecodeError:
    print(f"Invalid JSON format in input file {input_path}")
    exit(1)

# Initialize dynamic profiles using defaultdict
profiles = defaultdict(Counter)

# Analyze messages from all conversation pairs
for pair_messages in conversation_pairs.values():
    for item in pair_messages:
        name = item["name"]
        statement = item["message"]
        prompt = f"Classify the sentiment of the following statement into one of these categories: Professional, Assertive, Constructive, Enthusiastic, Critical, Passive-Aggressive, Defensive, Neutral, Frustrated, or Supportive. Respond with just the category name.\n\nStatement: \"{statement}\""
        response = ""
        
        # Stream model response
        for chunk in client.stream([{"role": "user", "content": prompt}]):
            response += chunk.content
        
        # Add to counter for this person
        profiles[name][response.strip()] += 1

# Calculate sentiment profiles for each person
output_json = {"profiles": []}

for name, counter in profiles.items():
    # Get total messages for this person
    total = sum(counter.values())
    
    # Get top 3 sentiments
    top_3 = counter.most_common(3)
    
    # Calculate percentages and ensure they sum to 100%
    raw_percentages = [(sentiment, (count/total) * 100) for sentiment, count in top_3]
    total_percentage = sum(p for _, p in raw_percentages)
    
    # Normalize percentages to sum to 100%
    normalized_percentages = [(sentiment, round((percentage/total_percentage) * 100)) 
                            for sentiment, percentage in raw_percentages]
    
    # Adjust rounding to ensure exactly 100%
    total_rounded = sum(p for _, p in normalized_percentages)
    if total_rounded != 100:
        diff = 100 - total_rounded
        # Add the difference to the largest percentage
        sentiment, percentage = normalized_percentages[0]
        normalized_percentages[0] = (sentiment, percentage + diff)
    
    profile = {
        "name": name,
        "total_messages": total,
        "sentiment_profile": [
            {
                "class": sentiment,
                "percentage": percentage
            }
            for sentiment, percentage in normalized_percentages
        ]
    }
    
    output_json["profiles"].append(profile)

# Sort profiles by name
output_json["profiles"].sort(key=lambda x: x["name"])

# Save output JSON to file with UTF-8 encoding
try:
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output_json, f, indent=4, ensure_ascii=False)
    print(f"Results saved to {output_path}")
except IOError:
    print(f"Error saving results to {output_path}")

# Print the results to console as well
print("\nSentiment Analysis Results:")
print(json.dumps(output_json, indent=4, ensure_ascii=False))