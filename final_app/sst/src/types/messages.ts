// Basic Message Types
export type Frequency = {
    [time: string]: number;
};

export type PeakHours = {
    [hour: string]: number;
};

export type ResponseTimes = {
    average_hours: number;
    median_hours: number;
    max_hours: number;
};

export type MessageLengthStats = {
    count: number;
    mean: number;
    min: number;
    max: number;
};

export type ConversationInitiation = {
    total_conversations_est: number;
    initiation_rate_per_message: number;
};

export type TopRecipient = {
    name_sender: string;
    name_receiver: string;
    count: number;
};

// Individual Level Types
export type IndividualLevel = {
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

// Department Level Types
export type IntraInterRatio = {
    intra_department_ratio: number;
    inter_department_ratio: number;
};

export type DepartmentInteractionsSubmatrix = {
    [department: string]: number;
};

export type DepartmentLevel = {
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

// Company Level Types
export type DepartmentInteractionMatrix = {
    [department: string]: {
        [department: string]: number;
    };
};

export type CompanyLevel = {
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

export type MessagesStatistics = {
    individual_level: IndividualLevel;
    department_level: DepartmentLevel;
    company_level: CompanyLevel;
};