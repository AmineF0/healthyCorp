import sqlite3
from eralchemy import render_er

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

    def generate_er_diagram(self):
        self.connect()
        render_er("sqlite+pysqlite:///" + self.db_name, "er_diagram.png")
        self.close()
