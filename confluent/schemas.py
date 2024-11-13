# user_schema = """{
#     "$schema": "https://json-schema.org/draft/2020-12/schema",
#     "title": "user",
#     "description": "A user schema",
#     "type": "object",
#     "properties": {
#       "name": {
#         "description": "user name",
#         "type": "string"
#       },
#       "age": {
#         "description": "the age of the user",
#         "type": "number"
#       },
#       "department": {
#         "description": "department that the user belongs to",
#         "type": "string"
#       }
#     },
#     "required": ["name", "age", "department"]
# }"""


user_schema = """
{
    "title": "EmployeeSchema",
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "age": {"type": "integer"},
        "department": {"type": "string"}
    },
    "required": ["name", "age", "department"]
}
"""
