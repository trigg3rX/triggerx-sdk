import axios, { AxiosInstance } from 'axios';
import {
  UserData,
  JobData,
  CreateJobRequest,
  UpdateJobRequest,
  JobSummary,
  WalletPoints,
  TimeBasedJobConfig,
  EventBasedJobConfig,
  ConditionBasedJobConfig,
} from './types';

export class TriggerXSDK {
  private client: AxiosInstance;

  constructor(apiKey: string, baseURL: string = 'http://192.168.1.57:9002/') {  
    this.client = axios.create({
      baseURL,
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  // Specialized Job Creation Functions
  async createStaticTimeBasedJob(config: TimeBasedJobConfig) {
    const jobData: CreateJobRequest[] = [{
      user_address: config.userAddress,
      task_definition_id: 1, // Static Time-based
      stake_amount: config.stake_amount || '0',
      token_amount: config.token_amount || '0',
      priority: config.priority || 1,
      security: config.security || 1,
      recurring: config.recurring ?? true,
      time_interval: config.timeInterval,
      time_frame: config.startTime || Math.floor(Date.now() / 1000),
      trigger_chain_id: config.targetChainId, // Use target chain for trigger in static
      trigger_contract_address: config.targetContract,
      trigger_event: '', // Empty for time-based
      script_ipfs_url: '',
      script_trigger_function: '',
      target_chain_id: config.targetChainId,
      target_contract_address: config.targetContract,
      target_function: config.targetFunction,
      arguments: config.arguments || []
    }];
    return this.createJob(jobData);
  }

  async createDynamicTimeBasedJob(config: TimeBasedJobConfig) {
    if (!config.scriptIpfsUrl || !config.scriptTriggerFunction) {
      throw new Error('Dynamic jobs require scriptIpfsUrl and scriptTriggerFunction');
    }
    const jobData: CreateJobRequest[] = [{
      user_address: config.userAddress,
      task_definition_id: 2, // Dynamic Time-based
      stake_amount: config.stake_amount || '0',
      token_amount: config.token_amount || '0',
      priority: config.priority || 1,
      security: config.security || 1,
      recurring: config.recurring ?? true,
      time_interval: config.timeInterval,
      time_frame: config.startTime || Math.floor(Date.now() / 1000),
      trigger_chain_id: config.targetChainId,
      trigger_contract_address: config.targetContract,
      trigger_event: '',
      script_ipfs_url: config.scriptIpfsUrl,
      script_trigger_function: config.scriptTriggerFunction,
      target_chain_id: config.targetChainId,
      target_contract_address: config.targetContract,
      target_function: config.targetFunction,
      arguments: config.arguments || []
    }];
    return this.createJob(jobData);
  }

  async createStaticEventBasedJob(config: EventBasedJobConfig) {
    const jobData: CreateJobRequest[] = [{
      user_address: config.userAddress,
      task_definition_id: 5, // Static Event-based
      stake_amount: config.stake_amount || '0',
      token_amount: config.token_amount || '0',
      priority: config.priority || 1,
      security: config.security || 1,
      recurring: config.recurring ?? true,
      time_interval: 0,
      time_frame: Math.floor(Date.now() / 1000),
      trigger_chain_id: config.triggerChainId,
      trigger_contract_address: config.triggerContract,
      trigger_event: config.eventName,
      script_ipfs_url: '',
      script_trigger_function: '',
      target_chain_id: config.targetChainId,
      target_contract_address: config.targetContract,
      target_function: config.targetFunction,
      arguments: config.arguments || []
    }];
    return this.createJob(jobData);
  }

  async createDynamicEventBasedJob(config: EventBasedJobConfig) {
    if (!config.scriptIpfsUrl || !config.scriptTriggerFunction) {
      throw new Error('Dynamic jobs require scriptIpfsUrl and scriptTriggerFunction');
    }
    const jobData: CreateJobRequest[] = [{
      user_address: config.userAddress,
      task_definition_id: 6, // Dynamic Event-based
      stake_amount: config.stake_amount || '0',
      token_amount: config.token_amount || '0',
      priority: config.priority || 1,
      security: config.security || 1,
      recurring: config.recurring ?? true,
      time_interval: 0,
      time_frame: Math.floor(Date.now() / 1000),
      trigger_chain_id: config.triggerChainId,
      trigger_contract_address: config.triggerContract,
      trigger_event: config.eventName,
      script_ipfs_url: config.scriptIpfsUrl,
      script_trigger_function: config.scriptTriggerFunction,
      target_chain_id: config.targetChainId,
      target_contract_address: config.targetContract,
      target_function: config.targetFunction,
      arguments: config.arguments || []
    }];
    return this.createJob(jobData);
  }

  async createStaticConditionBasedJob(config: ConditionBasedJobConfig) {
    const jobData: CreateJobRequest[] = [{
      user_address: config.userAddress,
      task_definition_id: 3, // Static Condition-based
      stake_amount: config.stake_amount || '0',
      token_amount: config.token_amount || '0',
      priority: config.priority || 1,
      security: config.security || 1,
      recurring: config.recurring ?? true,
      time_interval: 0,
      time_frame: Math.floor(Date.now() / 1000),
      trigger_chain_id: config.targetChainId,
      trigger_contract_address: config.targetContract,
      trigger_event: '',
      script_ipfs_url: config.scriptIpfsUrl,
      script_trigger_function: config.scriptTriggerFunction,
      target_chain_id: config.targetChainId,
      target_contract_address: config.targetContract,
      target_function: config.targetFunction,
      arguments: config.arguments || []
    }];
    return this.createJob(jobData);
  }

  async createDynamicConditionBasedJob(config: ConditionBasedJobConfig) {
    const jobData: CreateJobRequest[] = [{
      user_address: config.userAddress,
      task_definition_id: 4, // Dynamic Condition-based
      stake_amount: config.stake_amount || '0',
      token_amount: config.token_amount || '0',
      priority: config.priority || 1,
      security: config.security || 1,
      recurring: config.recurring ?? true,
      time_interval: 0,
      time_frame: Math.floor(Date.now() / 1000),
      trigger_chain_id: config.targetChainId,
      trigger_contract_address: config.targetContract,
      trigger_event: '',
      script_ipfs_url: config.scriptIpfsUrl,
      script_trigger_function: config.scriptTriggerFunction,
      target_chain_id: config.targetChainId,
      target_contract_address: config.targetContract,
      target_function: config.targetFunction,
      arguments: config.arguments || []
    }];
    return this.createJob(jobData);
  }

  // User endpoints
  async getUserData(userId: number): Promise<UserData> {
    const response = await this.client.get(`/api/users/${userId}`);
    return response.data;
  }

  async getWalletPoints(walletAddress: string): Promise<WalletPoints> {
    const response = await this.client.get(`/api/wallet/points/${walletAddress}`);
    return response.data;
  }

  // Job endpoints
  async createJob(jobData: CreateJobRequest[]): Promise<{
    message: string;
    Data: {
      user_id: number;
      account_balance: string;
      token_balance: string;
      job_ids: number[];
      task_definition_ids: number[];
      time_frames: number[];
    };
  }> {
    const response = await this.client.post('/api/jobs', jobData);
    return response.data;
  }

  async getJobData(jobId: number): Promise<JobData> {
    const response = await this.client.get(`/api/jobs/${jobId}`);
    return response.data;
  }

  async updateJob(jobId: number, updateData: UpdateJobRequest): Promise<void> {
    await this.client.put(`/api/jobs/${jobId}`, updateData);
  }

  async updateJobLastExecuted(jobId: number): Promise<void> {
    await this.client.put(`/api/jobs/${jobId}/lastexecuted`);
  }

  async getJobsByUserAddress(userAddress: string): Promise<JobSummary[]> {
    const response = await this.client.get(`/api/jobs/user/${userAddress}`);
    return response.data;
  }

  async deleteJob(jobId: number): Promise<void> {
    await this.client.put(`/api/jobs/delete/${jobId}`);
  }
} 