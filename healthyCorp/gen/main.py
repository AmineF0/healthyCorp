# Import necessary libraries
from openai import OpenAI
import random
import sqlite3
import pandas as pd

# Point to the local server
client = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")

# Define user profile fields
job_titles = ["Team Lead", "Senior Developer", "Marketing Specialist", "HR Manager", "Product Owner"]
departments = ["Engineering", "Marketing", "HR", "Product"]
communication_styles = ["Formal", "Informal", "Assertive", "Passive"]
personalities = ["Introverted", "Extroverted", "Analytical", "Empathetic"]
attitudes = ["Loyal", "Disengaged", "Neutral", "Supportive"]

# Function to generate synthetic user profile
def generate_user_profile():
    name = client.chat.completions.create(
        model="lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF",
        messages=[
            {"role": "system", "content": "Generate a random name."},
        ],
        temperature=0.7,
    ).choices[0].message.content
    
    profile = {
        "Name": name,
        "Gender": random.choice(["Male", "Female"]),
        "Job_Title": random.choice(job_titles),
        "Department": random.choice(departments),
        "Team": f"Team {random.randint(1, 10)}",
        "Expertise": random.choice(["DevOps", "JavaScript", "Brand Management", "Recruitment"]),
        "Experience": f"{random.randint(1, 20)} years",
        "Communication_Style": random.choice(communication_styles),
        "Personality": random.choice(personalities),
        "Attitude_Team": random.choice(attitudes),
        "Attitude_Company": random.choice(attitudes)
    }
    return profile

# Generate dataset
num_profiles = 1000  # You can increase this number for a larger dataset
profiles = [generate_user_profile() for _ in range(num_profiles)]

# Create a DataFrame
profiles_df = pd.DataFrame(profiles)

# Save to SQLite database
db_name = "enterprise_profiles.db"
conn = sqlite3.connect(db_name)
profiles_df.to_sql("user_profiles", conn, if_exists="replace", index=False)
conn.close()

print(f"Generated {num_profiles} user profiles and saved to {db_name}.")

# Example query to fetch data from the database
conn = sqlite3.connect(db_name)
cursor = conn.cursor()
cursor.execute("SELECT * FROM user_profiles LIMIT 5")
rows = cursor.fetchall()
for row in rows:
    print(row)
conn.close()