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

// Base configuration interface
interface BaseJobConfig {
  userAddress: string;
  priority?: number;
  security?: number;
  recurring?: boolean;
  targetChainId: string;
  targetContract: string;
  targetFunction: string;
  arguments?: string[];
  stake_amount?: string;
  token_amount?: string;
}

export interface TimeBasedJobConfig extends BaseJobConfig {
  timeInterval: number;
  startTime?: number;
  scriptIpfsUrl?: string;
  scriptTriggerFunction?: string;
}

export interface EventBasedJobConfig extends BaseJobConfig {
  triggerChainId: string;
  triggerContract: string;
  eventName: string;
  scriptIpfsUrl?: string;
  scriptTriggerFunction?: string;
}

export interface ConditionBasedJobConfig extends BaseJobConfig {
  scriptIpfsUrl: string;
  scriptTriggerFunction: string;
}

export interface CreateJobRequest {
  user_address: string;
  task_definition_id: number;
  stake_amount: string;
  token_amount: string;
  priority: number;
  security: number;
  time_frame: number;
  time_interval: number;
  recurring: boolean;
  trigger_chain_id: string;
  trigger_contract_address: string;
  trigger_event: string;
  script_ipfs_url: string;
  script_trigger_function: string;
  target_chain_id: string;
  target_contract_address: string;
  target_function: string;
  arguments: string[];
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

export enum TriggerType {
  TIME = 'TIME',
  CONDITION = 'CONDITION',
  EVENT = 'EVENT'
}

export enum TaskType {
  STATIC = 'STATIC',
  DYNAMIC = 'DYNAMIC'
}

// Task Definition IDs mapping
export const TaskDefinitionIds = {
  [TriggerType.TIME]: {
    [TaskType.STATIC]: 1,
    [TaskType.DYNAMIC]: 2
  },
  [TriggerType.CONDITION]: {
    [TaskType.STATIC]: 3,
    [TaskType.DYNAMIC]: 4
  },
  [TriggerType.EVENT]: {
    [TaskType.STATIC]: 5,
    [TaskType.DYNAMIC]: 6
  }
};

export interface CreateJobOptions {
  name: string;
  triggerType: TriggerType;
  taskType: TaskType;
  
  // Time trigger specific
  timeInterval?: number;
  startTime?: number;
  
  // Event trigger specific
  eventConfig?: {
    chainId: string;
    contractAddress: string;
    eventName: string;
    topics?: Array<string | null>;
    blockConfirmations?: number;
  };
  
  // Condition trigger specific
  conditionConfig?: {
    scriptIpfsUrl: string;
    scriptTriggerFunction: string;
  };
  
  // Execution config
  targetChainId: string;
  targetContract: string;
  targetFunction: string;
  arguments: string[];
  
  // Optional params
  priority?: number;
  security?: number;
  recurring?: boolean;
} 