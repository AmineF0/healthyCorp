import json
import os
from pathlib import Path
import pickle
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from collections import Counter, defaultdict
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("API_KEY")
class SentimentAnalyzer:
    def __init__(self, api_key, checkpoint_dir="./checkpoints"):
        self.checkpoint_dir = Path(checkpoint_dir)
        self.checkpoint_dir.mkdir(exist_ok=True)
        self.progress_file = self.checkpoint_dir / "progress.pkl"
        self.results_file = self.checkpoint_dir / "partial_results.pkl"
        
        # Initialize NVIDIA AI client
        self.client = ChatNVIDIA(
            model="meta/llama-3.1-405b-instruct",
            api_key=api_key,
            temperature=0.2,
            top_p=0.7,
            max_tokens=1024,
        )
        
        # Load previous progress if exists
        self.processed_messages = self.load_progress()
        self.profiles = self.load_results() or defaultdict(Counter)

    def load_progress(self):
        if self.progress_file.exists():
            with open(self.progress_file, 'rb') as f:
                return pickle.load(f)
        return set()

    def load_results(self):
        if self.results_file.exists():
            with open(self.results_file, 'rb') as f:
                return pickle.load(f)
        return None

    def save_checkpoint(self):
        with open(self.progress_file, 'wb') as f:
            pickle.dump(self.processed_messages, f)
        with open(self.results_file, 'wb') as f:
            pickle.dump(self.profiles, f)

    def get_sentiment(self, statement):
        prompt = f"Classify the sentiment of the following statement into one of these categories: Professional, Assertive, Constructive, Enthusiastic, Critical, Passive-Aggressive, Defensive, Neutral, Frustrated, or Supportive. Respond with just the category name.\n\nStatement: \"{statement}\""
        response = ""
        
        try:
            for chunk in self.client.stream([{"role": "user", "content": prompt}]):
                response += chunk.content
            return response.strip()
        except Exception as e:
            print(f"Error in sentiment analysis: {str(e)}")
            raise

    def process_conversations(self, input_path, output_path):
        try:
            # Load input JSON
            with open(input_path, 'r', encoding='utf-8') as f:
                conversation_pairs = json.load(f)

            # Process messages
            for pair_messages in conversation_pairs.values():
                for item in pair_messages:
                    # Create unique message identifier
                    message_id = f"{item['name']}_{hash(item['message'])}"
                    
                    if message_id in self.processed_messages:
                        print(f"Skipping already processed message from {item['name']}")
                        continue

                    try:
                        sentiment = self.get_sentiment(item["message"])
                        self.profiles[item["name"]][sentiment] += 1
                        
                        # Mark as processed and save checkpoint
                        self.processed_messages.add(message_id)
                        self.save_checkpoint()
                        
                    except Exception as e:
                        print(f"Error processing message: {str(e)}")
                        self.save_checkpoint()
                        raise

            # Generate final output
            return self.generate_final_output(output_path)

        except Exception as e:
            print(f"Processing interrupted: {str(e)}")
            print(f"Progress saved. Processed {len(self.processed_messages)} messages")
            return None

    def generate_final_output(self, output_path):
        output_json = {"profiles": []}

        for name, counter in self.profiles.items():
            total = sum(counter.values())
            top_3 = counter.most_common(3)
            
            raw_percentages = [(sentiment, (count/total) * 100) for sentiment, count in top_3]
            total_percentage = sum(p for _, p in raw_percentages)
            
            normalized_percentages = [(sentiment, round((percentage/total_percentage) * 100)) 
                                    for sentiment, percentage in raw_percentages]
            
            total_rounded = sum(p for _, p in normalized_percentages)
            if total_rounded != 100:
                diff = 100 - total_rounded
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

        # Save output JSON
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(output_json, f, indent=4, ensure_ascii=False)
        
        return output_json

def main():
    api_key = api_key
    conversations_dir = "conversations"
    output_path = "sentiment_profiles.json"
    
    analyzer = SentimentAnalyzer(api_key)
    
    try:
        # Process each JSON file in the conversations directory
        for json_file in Path(conversations_dir).glob("*.json"):
            print(f"Processing {json_file}")
            results = analyzer.process_conversations(str(json_file), output_path)
            
        if results:
            print("\nSentiment Analysis Results:")
            print(json.dumps(results, indent=4, ensure_ascii=False))
            print(f"\nResults saved to {output_path}")
    except Exception as e:
        print(f"Analysis interrupted: {str(e)}")
        print("You can resume the analysis by running the script again.")

if __name__ == "__main__":
    main()