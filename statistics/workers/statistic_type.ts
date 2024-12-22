type PriorityDistribution = {
    High?: number;
    Medium?: number;
    Low?: number;
};

type WorkloadStatistics = {
    total_estimated_hours: number;
    average_hours_per_task: number;
    max_hours: number;
    min_hours: number;
    median_hours: number;
};

type DateStatistics = {
    earliest_task: string;
    latest_task: string;
    total_days_span: number;
};

type TaskMetrics = {
    tasks_with_dates: number;
    tasks_with_priorities: number;
    tasks_with_hours: number;
    completion_rate: number;
};

type Statistics = {
    total_tasks: number;
    priority_distribution: PriorityDistribution;
    workload_statistics: WorkloadStatistics;
    date_statistics: DateStatistics;
    task_metrics: TaskMetrics;
};

type EmployeesStatistics = {
    [name: string]: Statistics;
};


type DepartmentStatistic = {
    [department: string]: Statistics;
}

type CompanyStatistics = Statistics
