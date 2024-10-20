import random

# Global variables
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
            model="meta/llama-3.1-405b-instruct",
            messages=[
                {"role": "system", "content": "Generate a random corporation name. a single one. Make sure it sounds professional, and only the name is given. don t make it empty."},
            ],
            temperature=0.7,
        ).choices[0].message.content
        print(
            self.client.chat.completions.create(
              model="meta/llama-3.1-405b-instruct",

            messages=[
                {"role": "system", "content": "Generate a random corporation name."},
            ],
            temperature=0.7,
        )
        )
        print(f"Generated corporation name: {name}")

        description = self.client.chat.completions.create(
              model="meta/llama-3.1-405b-instruct",

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
              model="meta/llama-3.1-405b-instruct",

            messages=[
                {"role": "system", "content": f"Generate a random department name for the corporation named {corp_name}."},
            ],
            temperature=0.7,
        ).choices[0].message.content
        print(f"Generated department name: {name}")

        description = self.client.chat.completions.create(
              model="meta/llama-3.1-405b-instruct",

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
              model="meta/llama-3.1-405b-instruct",

            messages=[
                {"role": "system", "content": f"Generate a random team name for the department named {dept_name} in the corporation named {corp_name}."},
            ],
            temperature=0.7,
        ).choices[0].message.content
        print(f"Generated team name: {name}")

        description = self.client.chat.completions.create(
              model="meta/llama-3.1-405b-instruct",

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
              model="meta/llama-3.1-405b-instruct",

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
