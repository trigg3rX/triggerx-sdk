import { UserData, JobData, CreateJobRequest, UpdateJobRequest, JobSummary, WalletPoints } from './types';
export declare class TriggerXSDK {
    private client;
    constructor(apiKey: string, baseURL?: string);
    getUserData(userId: number): Promise<UserData>;
    getWalletPoints(walletAddress: string): Promise<WalletPoints>;
    createJob(jobData: CreateJobRequest[]): Promise<{
        message: string;
        Data: {
            user_id: number;
            account_balance: string;
            token_balance: string;
            job_ids: number[];
            task_definition_ids: number[];
            time_frames: number[];
        };
    }>;
    getJobData(jobId: number): Promise<JobData>;
    updateJob(jobId: number, updateData: UpdateJobRequest): Promise<void>;
    updateJobLastExecuted(jobId: number): Promise<void>;
    getJobsByUserAddress(userAddress: string): Promise<JobSummary[]>;
    deleteJob(jobId: number): Promise<void>;
}
