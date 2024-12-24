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





type Task = {
    date: string;
    task: string;
    priority: "High" | "Medium" | "Low";
    estimated_hours: number;
};

type EmployeeTasks = {
    [name: string]: Task[];
};



type TeamStructure = {
    [team: string]: string[];
};



type EmployeeProfile = {
    Name: string;
    Department: string;
    "Tasks summary": string;
    Profile: string;
    "Image URL": string;
    Gender: "male" | "female";
};

type EmployeeProfiles = {
    [name: string]: EmployeeProfile;
};


type Frequency = {
    [time: string]: number; // Represents hourly, daily, or monthly frequencies
};

type PeakHours = {
    [hour: string]: number; // Represents the frequency during specific peak hours
};

type ResponseTimes = {
    average_hours: number;
    median_hours: number;
    max_hours: number;
};

type MessageLengthStats = {
    count: number;
    mean: number;
    min: number;
    max: number;
};

type ConversationInitiation = {
    total_conversations_est: number;
    initiation_rate_per_message: number;
};

type TopRecipient = {
    name_sender: string;
    name_receiver: string;
    count: number;
};

type IndividualLevel = {
    [name: string]: {
        message_frequency: {
            hourly: Frequency;
            daily: Frequency;
            monthly: Frequency;
        };
        peak_hours: PeakHours;
        response_times: ResponseTimes;
        message_length_stats: MessageLengthStats;
        conversation_initiation: ConversationInitiation;
        top_recipients: TopRecipient[];
    };
};

type IntraInterRatio = {
    intra_department_ratio: number;
    inter_department_ratio: number;
};

type DepartmentInteractionsSubmatrix = {
    [department: string]: number;
};

type DepartmentLevel = {
    [department: string]: {
        message_frequency: {
            hourly: Frequency;
            daily: Frequency;
            monthly: Frequency;
        };
        peak_hours: PeakHours;
        response_times: ResponseTimes;
        intra_vs_inter_ratio: IntraInterRatio;
        department_interactions_submatrix: DepartmentInteractionsSubmatrix;
        message_length_stats: MessageLengthStats;
        most_active_individuals: { [individual: string]: number };
    };
};

type DepartmentInteractionMatrix = {
    [department: string]: {
        [department: string]: number;
    };
};

type CompanyLevel = {
    message_frequency: {
        hourly: Frequency;
        daily: Frequency;
        monthly: Frequency;
    };
    peak_hours: PeakHours;
    response_times: ResponseTimes;
    department_interaction_matrix_symmetrical: DepartmentInteractionMatrix;
    message_length_stats: MessageLengthStats;
    intra_vs_inter_ratio: IntraInterRatio;
    most_active_departments: { [department: string]: number };
};

type DataStructure = {
    individual_level: IndividualLevel;
    department_level: DepartmentLevel;
    company_level: CompanyLevel;
};
