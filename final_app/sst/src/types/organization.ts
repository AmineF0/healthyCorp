export type TeamStructure = {
    [team: string]: string[];
};

export type EmployeeProfile = {
    Name: string;
    Department: string;
    "Tasks summary": string;
    Profile: string;
    "Image URL": string;
    Gender: "male" | "female";
};

export type EmployeeProfiles = {
    [name: string]: EmployeeProfile;
};