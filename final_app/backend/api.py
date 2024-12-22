from fastapi import FastAPI

app = FastAPI()



# Person Level API
@app.get("/persons/{name}")
def fetch_person_details(name: str):
    """Merges the response of all subfunctions related to a person into one object."""
    return {
        "person_info": fetch_person_info(name),
        "characteristics": fetch_person_characteristics(name),
        "statistics": fetch_person_statistics(name)
    }

def fetch_person_info(name: str):
    """Returns personal information such as name, picture, and position."""
    pass

def fetch_person_characteristics(name: str):
    """Returns the top 3 characteristics of the person."""
    pass

def fetch_person_statistics(name: str):
    """Returns all statistics needed for the frontend."""
    pass

# Department Level API
@app.get("/departments/{department_name}")
def fetch_department_details(department_name: str):
    """Merges the response of all subfunctions related to a department into one object."""
    return {
        "department_info": fetch_department_info(department_name),
        "sociometry": fetch_department_sociometry(department_name),
        "relationships": fetch_department_relationships(department_name),
        "people_summary": fetch_people_summary(department_name)
    }

def fetch_department_info(department_name: str):
    """Returns information about the department, such as name and activity."""
    pass

def fetch_department_sociometry(department_name: str):
    """Returns the sociometry of the department."""
    pass

def fetch_department_relationships(department_name: str):
    """Returns the relationships within the department."""
    pass

def fetch_people_summary(department_name: str):
    """Returns a summary of people in the department."""
    pass

# Company Level API
@app.get("/company")
def fetch_company_details():
    """Merges the response of all subfunctions related to the company into one object."""
    return {
        "company_info": fetch_company_info(),
        "sociometry": fetch_company_sociometry(),
        "department_summary": fetch_department_summary()
    }

def fetch_company_info():
    """Returns general information about the company."""
    pass

def fetch_company_sociometry():
    """Returns the sociometry of the company."""
    pass

def fetch_department_summary():
    """Returns a summary of all departments in the company."""
    pass