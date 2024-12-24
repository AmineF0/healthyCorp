export type Task = {
    date: string;
    task: string;
    priority: "High" | "Medium" | "Low";
    estimated_hours: number;
};

export type EmployeeTasks = {
    [name: string]: Task[];
};