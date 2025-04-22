export interface UserData {
    user_id: number;
    user_address: string;
    created_at?: string;
    job_ids: number[];
    account_balance: string;
    token_balance: string;
    last_updated_at?: string;
}
export interface JobData {
    job_id: number;
    task_definition_id: number;
    user_id: number;
    priority: number;
    security: number;
    link_job_id: number;
    chain_status: number;
    time_frame: number;
    recurring: boolean;
    time_interval: number;
    trigger_chain_id: string;
    trigger_contract_address: string;
    trigger_event: string;
    script_ipfs_url: string;
    script_trigger_function: string;
    target_chain_id: string;
    target_contract_address: string;
    target_function: string;
    arg_type: number;
    arguments: string[];
    script_target_function: string;
    status: boolean;
    job_cost_prediction: number;
    created_at: string;
    last_executed_at: string | null;
    task_ids: number[];
}
export interface CreateJobRequest {
    user_address: string;
    stake_amount: number;
    token_amount: number;
    task_definition_id: number;
    priority: number;
    security: number;
    time_frame: number;
    recurring: boolean;
    time_interval: number;
    trigger_chain_id: string;
    trigger_contract_address: string;
    trigger_event: string;
    script_ipfs_url: string;
    script_trigger_function: string;
    target_chain_id: string;
    target_contract_address: string;
    target_function: string;
    arg_type: number;
    arguments: string[];
    script_target_function: string;
    job_cost_prediction?: number;
}
export interface UpdateJobRequest {
    job_id: number;
    recurring: boolean;
    time_frame: number;
}
export interface JobSummary {
    job_id: number;
    job_type: number;
    status: boolean;
    chain_status: number;
    link_job_id: number;
}
export interface WalletPoints {
    total_points: number;
}
export declare enum TriggerType {
    TIME = "TIME",
    CONDITION = "CONDITION",
    EVENT = "EVENT"
}
export declare enum TaskType {
    STATIC = "STATIC",
    DYNAMIC = "DYNAMIC"
}
export declare const TaskDefinitionIds: {
    TIME: {
        STATIC: number;
        DYNAMIC: number;
    };
    CONDITION: {
        STATIC: number;
        DYNAMIC: number;
    };
    EVENT: {
        STATIC: number;
        DYNAMIC: number;
    };
};
export interface CreateJobOptions {
    name: string;
    triggerType: TriggerType;
    taskType: TaskType;
    timeInterval?: number;
    startTime?: number;
    eventConfig?: {
        chainId: string;
        contractAddress: string;
        eventName: string;
        topics?: Array<string | null>;
        blockConfirmations?: number;
    };
    conditionConfig?: {
        scriptIpfsUrl: string;
        scriptTriggerFunction: string;
    };
    targetChainId: string;
    targetContract: string;
    targetFunction: string;
    arguments: string[];
    priority?: number;
    security?: number;
    recurring?: boolean;
}
