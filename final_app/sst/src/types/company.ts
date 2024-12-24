export interface Employee {
  name: string;
  role?: string;
  department: string;
}

export interface Department {
  name: string;
  employees: string[];
}