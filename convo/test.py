import json

def split_conversations(input_file):
    try:
        # Open the file with UTF-8 encoding
        with open(input_file, 'r', encoding='utf-8') as file:
            data = json.load(file)
            
        # For each conversation pair, create a new JSON file
        for pair, messages in data.items():
            # Clean the pair string to make it suitable for a filename
            filename = pair.replace("('", "").replace("')", "").replace("', '", "_").replace(" ", "_")
            output_file = f"{filename}.json"
            
            # Write the file with UTF-8 encoding
            with open(output_file, 'w', encoding='utf-8') as file:
                json.dump({pair: messages}, file, indent=2, ensure_ascii=False)
                
            print(f"Created: {output_file}")
            
    except FileNotFoundError:
        print(f"Error: The file {input_file} was not found.")
    except json.JSONDecodeError:
        print(f"Error: The file {input_file} is not valid JSON.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

# Usage
split_conversations('messages.json')