import os
import json
COMPATIBILITY_MATRIX = {
    'Enthusiastic': {
        'Enthusiastic': 3,
        'Constructive': 4,
        'Professional': 2,
        'Critical': -3,
        'Assertive': 1,
        'Supportive': 4,
        'Passive-Aggressive': -4,
        'Defensive': -2,
        'Frustrated': -4,
        'Neutral': 0
    },
    'Constructive': {
        'Enthusiastic': 4,
        'Constructive': 3,
        'Professional': 4,
        'Critical': -2,
        'Assertive': 3,
        'Supportive': 5,
        'Passive-Aggressive': -5,
        'Defensive': -2,
        'Frustrated': -3,
        'Neutral': 1
    },
    'Professional': {
        'Enthusiastic': 2,
        'Constructive': 4,
        'Professional': 4,
        'Critical': -1,
        'Assertive': 2,
        'Supportive': 3,
        'Passive-Aggressive': -3,
        'Defensive': -1,
        'Frustrated': -2,
        'Neutral': 1
    },
    'Critical': {
        'Enthusiastic': -3,
        'Constructive': -2,
        'Professional': -1,
        'Critical': 2,
        'Assertive': -1,
        'Supportive': -2,
        'Passive-Aggressive': -4,
        'Defensive': -3,
        'Frustrated': -3,
        'Neutral': -1
    },
    'Assertive': {
        'Enthusiastic': 1,
        'Constructive': 3,
        'Professional': 2,
        'Critical': -1,
        'Assertive': 3,
        'Supportive': 2,
        'Passive-Aggressive': -4,
        'Defensive': -2,
        'Frustrated': -2,
        'Neutral': 0
    }
}

hierarchy_dict = {
    'Ahmad Al-Rashid': 'LEADERSHIP',
    'Michael Anderson': 'LEADERSHIP',
    'Fatima Al-Qassim': 'LEADERSHIP',
    'William Thompson': 'PROJECT ALPHA',
    'Sarah Mitchell': 'PROJECT ALPHA',
    'Omar Al-Sayed': 'PROJECT ALPHA',
    'Mariam Al-Hashimi': 'PROJECT ALPHA',
    'Hassan Al-Mahmoud': 'PROJECT BETA',
    'Elizabeth Parker': 'PROJECT BETA',
    'James Cooper': 'PROJECT BETA',
    'Noura Al-Zahrani': 'PROJECT BETA',
    'Mohammed Al-Qahtani': 'PROJECT GAMMA',
    'Katherine Wilson': 'PROJECT GAMMA',
    'Robert Stevens': 'PROJECT GAMMA',
    'Leila Al-Harbi': 'PROJECT GAMMA',
    'Khalid Al-Nasser': 'OPERATIONS',
    'Jennifer Brooks': 'OPERATIONS',
    'Aisha Al-Dubai': 'OPERATIONS',
    'Thomas Richardson': 'TECHNICAL',
    'Ibrahim Al-Kuwaiti': 'TECHNICAL'
}

def load_json_file(file_path):
    """Load JSON data from a file."""
    with open(file_path, 'r') as file:
        return json.load(file)
    
def normalize_score(score, min_val, max_val, target_min=0, target_max=100):
    if max_val == min_val:
        return target_max
    return ((score - min_val) / (max_val - min_val)) * (target_max - target_min) + target_min

def calculate_cpc(profile_a, profile_b):
    total_score = 0
    for style_a in profile_a:
        for style_b in profile_b:
            if style_a['class'] in COMPATIBILITY_MATRIX and style_b['class'] in COMPATIBILITY_MATRIX[style_a['class']]:
                compatibility = COMPATIBILITY_MATRIX[style_a['class']][style_b['class']]
                weighted_score = compatibility * (style_a['percentage']/100) * (style_b['percentage']/100)
                total_score += weighted_score
    
    # Normalize from [-5,5] to [0,100]
    normalized_score = normalize_score(total_score, -5, 5, 0, 100)
    return normalized_score * 0.35

def calculate_hierarchical_distance(person_a, person_b, hierarchy):
    team_a = hierarchy[person_a]
    team_b = hierarchy[person_b]
    
    # Define organizational levels
    levels = {
        'LEADERSHIP': 1,
        'OPERATIONS': 2,
        'TECHNICAL': 2,
        'PROJECT ALPHA': 3,
        'PROJECT BETA': 3,
        'PROJECT GAMMA': 3
    }
    
    level_difference = abs(levels[team_a] - levels[team_b])
    score = 100 - (level_difference * 20)
    return max(0, score) * 0.20

def calculate_tci(person_a, person_b, profiles, hierarchy):
    # Find profiles
    profile_a = next((p for p in profiles if p['name'] == person_a), None)
    profile_b = next((p for p in profiles if p['name'] == person_b), None)
    
    if not profile_a or not profile_b:
        return 0
    
    # Message frequency component
    all_messages = [p['total_messages'] for p in profiles]
    max_messages = max(all_messages)
    min_messages = min(all_messages)
    
    avg_messages = (profile_a['total_messages'] + profile_b['total_messages']) / 2
    message_score = normalize_score(avg_messages, min_messages, max_messages)
    
    # Team cohesion component
    same_team = hierarchy[person_a] == hierarchy[person_b]
    team_score = 100 if same_team else 50
    
    final_score = (message_score + team_score) / 2
    return final_score * 0.25

def calculate_his(person_a, person_b, hierarchy):
    # Base HIS on team membership
    same_team = hierarchy[person_a] == hierarchy[person_b]
    score = 85 if same_team else 60
    return score * 0.20

def calculate_rhs(profiles, hierarchy):
    results = []
    names = list(hierarchy.keys())
    
    for i in range(len(names)):
        for j in range(i + 1, len(names)):
            person_a = names[i]
            person_b = names[j]
            
            # Get profiles
            profile_a = next((p for p in profiles if p['name'] == person_a), None)
            profile_b = next((p for p in profiles if p['name'] == person_b), None)
            
            if profile_a and profile_b:
                cpc = calculate_cpc(profile_a['sentiment_profile'], profile_b['sentiment_profile'])
                hd = calculate_hierarchical_distance(person_a, person_b, hierarchy)
                tci = calculate_tci(person_a, person_b, profiles, hierarchy)
                his = calculate_his(person_a, person_b, hierarchy)
                
                total_rhs = cpc + hd + tci + his
                
                results.append({
                    'person_a': person_a,
                    'person_b': person_b,
                    'rhs': round(total_rhs, 2)
                })
    
    return results

def save_results_to_json(results, output_path):
    """Save results to a JSON file in the specified format."""
    formatted_results = []
    for result in results:
        formatted_results.append({
            "person_a": result['person_a'],
            "person_b": result['person_b'],
            "rhs_score": result['rhs']
        })
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(formatted_results, f, indent=4, ensure_ascii=False)

def main():
    # Get the current directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Specify the paths
    json_path = os.path.join(current_dir, 'sentiment_profiles.json')
    output_path = os.path.join(current_dir, 'rhs_results.json')
    
    try:
        # Load the sentiment profiles
        sentiment_profiles = load_json_file(json_path)
        
        # Calculate RHS scores
        results = calculate_rhs(sentiment_profiles['profiles'], hierarchy_dict)
        
        # Save results to JSON file
        save_results_to_json(results, output_path)
        
        print(f"\nResults have been saved to: {output_path}")
            
    except FileNotFoundError:
        print(f"Error: Could not find the file at {json_path}")
    except json.JSONDecodeError:
        print("Error: Invalid JSON format in the sentiment profiles file")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()