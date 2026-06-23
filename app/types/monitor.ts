export type MonitorStatus = "up" | "down" | "warning";

export interface CheckResult {
    id: string;
    timestamp: number;
    status: MonitorStatus;
    latency: number;
    statusCode: number;
    errorReason?: string;
}

export interface MonitorSite {
    id: string;
    name: string;
    url: string;
    isActive: boolean;
    createdAt: number;
    history: CheckResult[];
}