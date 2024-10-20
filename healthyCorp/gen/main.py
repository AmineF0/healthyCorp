from openai import OpenAI
import random
import pandas as pd
from database_handler import DatabaseHandler

from generators import CorporationGenerator, DepartmentGenerator, TeamGenerator, TeamMemberGenerator

# Initialize OpenAI client
client = OpenAI(
      base_url = "https://integrate.api.nvidia.com/v1",
  api_key = "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"
)

# Global variables
num_corporations = 1  # Number of corporations to simulate
num_departments_range = (1, 1)  # Range for number of departments per corporation
num_teams_range = (2, 2)  # Range for number of teams per department
num_members_range = (2, 2)  # Range for number of members per team
num_employees_department_range = (4, 4)  # Range for number of employees per department
num_employees_corporation_range = (4, 4)  # Range for number of employees per corporation

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
