from openai import OpenAI
import random
import sqlite3
import pandas as pd

# Initialize OpenAI client
client = OpenAI(base_url="http://localhost:5000/v1", api_key="lm-studio")

# Global variables
num_corporations = 1  # Number of corporations to simulate
num_departments_range = (1, 1)  # Range for number of departments per corporation
num_teams_range = (2, 2)  # Range for number of teams per department
num_members_range = (2, 2)  # Range for number of members per team
num_employees_department_range = (4, 4)  # Range for number of employees per department
num_employees_corporation_range = (4, 4)  # Range for number of employees per corporation

class CorporationGenerator:
    def __init__(self, client):
        self.client = client

    def generate(self):
        print("Generating corporation...")
        name = self.client.chat.completions.create(
            model="lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF",
            messages=[
                {"role": "system", "content": "Generate a random corporation name."},
            ],
            temperature=0.7,
        ).choices[0].message.content
        print(f"Generated corporation name: {name}")

        description = self.client.chat.completions.create(
            model="lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF",
            messages=[
                {"role": "system", "content": f"Generate a brief description for the corporation named {name}."},
            ],
            temperature=0.7,
        ).choices[0].message.content
        print(f"Generated corporation description: {description}")

        return {
            "Name": name,
            "Employees": random.randint(*num_employees_corporation_range),
            "Market": random.choice(["Technology", "Healthcare", "Finance", "Retail", "Manufacturing"]),
            "Description": description
        }

class DepartmentGenerator:
    def __init__(self, client):
        self.client = client

    def generate(self, corp_id, corp_name):
        print(f"Generating department for corporation: {corp_name}...")
        name = self.client.chat.completions.create(
            model="lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF",
            messages=[
                {"role": "system", "content": f"Generate a random department name for the corporation named {corp_name}."},
            ],
            temperature=0.7,
        ).choices[0].message.content
        print(f"Generated department name: {name}")

        description = self.client.chat.completions.create(
            model="lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF",
            messages=[
                {"role": "system", "content": f"Generate a brief description for the department named {name} in the corporation named {corp_name}."},
            ],
            temperature=0.7,
        ).choices[0].message.content
        print(f"Generated department description: {description}")

        return {
            "Corporation_ID": corp_id,
            "Name": name,
            "Employees": random.randint(*num_employees_department_range),
            "Description": description
        }

class TeamGenerator:
    def __init__(self, client):
        self.client = client

    def generate(self, dept_id, dept_name, corp_name):
        print(f"Generating team for department: {dept_name} in corporation: {corp_name}...")
        name = self.client.chat.completions.create(
            model="lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF",
            messages=[
                {"role": "system", "content": f"Generate a random team name for the department named {dept_name} in the corporation named {corp_name}."},
            ],
            temperature=0.7,
        ).choices[0].message.content
        print(f"Generated team name: {name}")

        description = self.client.chat.completions.create(
            model="lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF",
            messages=[
                {"role": "system", "content": f"Generate a brief description for the team named {name} in the department named {dept_name} of the corporation named {corp_name}."},
            ],
            temperature=0.7,
        ).choices[0].message.content
        print(f"Generated team description: {description}")

        return {
            "Department_ID": dept_id,
            "Name": name,
            "Members": random.randint(*num_members_range),
            "Description": description
        }

class TeamMemberGenerator:
    def __init__(self, client):
        self.client = client

    def generate(self, team_id, team_name, dept_name, corp_name, is_lead=False):
        print(f"Generating team member for team: {team_name} in department: {dept_name} of corporation: {corp_name}...")
        name = self.client.chat.completions.create(
            model="lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF",
            messages=[
                {"role": "system", "content": f"Generate a random name for a team member in the team named {team_name} of the department named {dept_name} in the corporation named {corp_name}."},
            ],
            temperature=0.7,
        ).choices[0].message.content
        print(f"Generated team member name: {name}")

        return {
            "Team_ID": team_id,
            "Name": name,
            "Role": "Team Lead" if is_lead else "Member",
            "Expertise": random.choice(["DevOps", "JavaScript", "Brand Management", "Recruitment"]),
            "Experience": f"{random.randint(1, 20)} years",
            "Communication_Style": random.choice(["Formal", "Informal", "Assertive", "Passive"]),
            "Personality": random.choice(["Introverted", "Extroverted", "Analytical", "Empathetic"]),
            "Attitude_Team": random.choice(["Loyal", "Disengaged", "Neutral", "Supportive"]),
            "Attitude_Company": random.choice(["Loyal", "Disengaged", "Neutral", "Supportive"])
        }

class DatabaseHandler:
    def __init__(self, db_name="enterprise_structure.db"):
        self.db_name = db_name
        self.conn = None

    def connect(self):
        print(f"Connecting to database: {self.db_name}...")
        self.conn = sqlite3.connect(self.db_name)

    def close(self):
        if self.conn:
            print(f"Closing connection to database: {self.db_name}...")
            self.conn.close()

    def save_to_db(self, corporations_df, departments_df, teams_df, people_df):
        self.connect()
        print("Saving corporations to database...")
        corporations_df.to_sql("corporations", self.conn, if_exists="replace", index=True, index_label="Corporation_ID")
        print("Saving departments to database...")
        departments_df.to_sql("departments", self.conn, if_exists="replace", index=True, index_label="Department_ID")
        print("Saving teams to database...")
        teams_df.to_sql("teams", self.conn, if_exists="replace", index=True, index_label="Team_ID")
        print("Saving people to database...")
        people_df.to_sql("people", self.conn, if_exists="replace", index=True, index_label="Person_ID")
        self.close()

    def print_schema(self):
        self.connect()
        cursor = self.conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = cursor.fetchall()
        for table in tables:
            table_name = table[0]
            print(f"\nSchema for table {table_name}:\n")
            cursor.execute(f"PRAGMA table_info({table_name})")
            columns = cursor.fetchall()
            for column in columns:
                print(column)
        self.close()

    def example_query(self):
        self.connect()
        cursor = self.conn.cursor()
        print("Executing example query...")
        cursor.execute("SELECT * FROM corporations LIMIT 3")
        rows = cursor.fetchall()
        for row in rows:
            print(row)
        self.close()

# Instantiate Generators
corporation_generator = CorporationGenerator(client)
department_generator = DepartmentGenerator(client)
team_generator = TeamGenerator(client)
teammember_generator = TeamMemberGenerator(client)

# Generate corporations, departments, teams, and people
print("Starting generation of corporations, departments, teams, and people...")
corporations = [corporation_generator.generate() for _ in range(num_corporations)]
departments = []
teams = []
people = []

for corp_id, corporation in enumerate(corporations, start=1):
    corp_name = corporation["Name"]
    num_departments = random.randint(*num_departments_range)
    for _ in range(num_departments):
        department = department_generator.generate(corp_id, corp_name)
        departments.append(department)
        dept_id = len(departments)
        dept_name = department["Name"]

        num_teams = random.randint(*num_teams_range)
        for _ in range(num_teams):
            team = team_generator.generate(dept_id, dept_name, corp_name)
            teams.append(team)
            team_id = len(teams)
            team_name = team["Name"]

            # Add team lead
            people.append(teammember_generator.generate(team_id, team_name, dept_name, corp_name, is_lead=True))

            # Add team members
            num_members = team["Members"] - 1
            for _ in range(num_members):
                people.append(teammember_generator.generate(team_id, team_name, dept_name, corp_name))

# Create DataFrames
print("Creating DataFrames for corporations, departments, teams, and people...")
corporations_df = pd.DataFrame(corporations)
departments_df = pd.DataFrame(departments)
teams_df = pd.DataFrame(teams)
people_df = pd.DataFrame(people)

# Save to SQLite database
db_handler = DatabaseHandler()
db_handler.save_to_db(corporations_df, departments_df, teams_df, people_df)

print(f"Generated {len(corporations)} corporations, {len(departments)} departments, {len(teams)} teams, and {len(people)} people, and saved to {db_handler.db_name}.")

# Example usage of DatabaseHandler
db_handler.print_schema()
db_handler.example_query()
