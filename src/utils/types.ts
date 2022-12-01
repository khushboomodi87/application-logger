
export interface LoggerListData {
    logId: string;
    applicationType?: string;
    applicationId?: string;
    actionType: string;
    creationTimestamp: string
}

export interface LoggerData {
    success: boolean;
    elapsed: number;
    result: {
        totalPages: number;
        number: number;
        recordsTotal: number;
        recordsFiltered: number;
        auditLog: LoggerListData[]
    }
}

export interface LoggerQueryParams {
    actionType?: string;
    applicationType?: string;
    applicationId?: string;
    from_date?: string | null
    to_date?: string | null
}