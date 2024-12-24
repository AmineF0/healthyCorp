// Basic Statistics Types
export type PriorityDistribution = {
    High?: number;
    Medium?: number;
    Low?: number;
};

export type WorkloadStatistics = {
    total_estimated_hours: number;
    average_hours_per_task: number;
    max_hours: number;
    min_hours: number;
    median_hours: number;
};

export type DateStatistics = {
    earliest_task: string;
    latest_task: string;
    total_days_span: number;
};

export type TaskMetrics = {
    tasks_with_dates: number;
    tasks_with_priorities: number;
    tasks_with_hours: number;
    completion_rate: number;
};

export type Statistics = {
    total_tasks: number;
    priority_distribution: PriorityDistribution;
    workload_statistics: WorkloadStatistics;
    date_statistics: DateStatistics;
    task_metrics: TaskMetrics;
};

// Aggregate Statistics Types
export type EmployeesStatistics = {
    [name: string]: Statistics;
};

export type DepartmentStatistic = {
    [department: string]: Statistics;
};

export type CompanyStatistics = Statistics;