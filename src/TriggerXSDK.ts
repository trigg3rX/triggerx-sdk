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
  JobType,
  TaskDefinitionIds
} from './types';

export class TriggerXSDK {
  private client: AxiosInstance;
  private userAddress: string;

  constructor(apiKey: string, userAddress: string, baseURL: string = 'http://192.168.1.57:9002/') {  
    this.client = axios.create({
      baseURL,
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });
    this.userAddress = userAddress;
  }

  // Main job creation methods
  async createTimeBasedJob(config: TimeBasedJobConfig) {
    const taskDefinitionId = TaskDefinitionIds[JobType.TIME][config.argType === 1 ? 'static' : 'dynamic'];
    
    if (config.argType !== 1 && !config.scriptIpfsUrl) {
      throw new Error('Dynamic jobs require scriptIpfsUrl');
    }

    if (config.argType === 1 && !config.arguments) {
      throw new Error('Static jobs require arguments');
    }

    const jobData: CreateJobRequest[] = [{
      user_address: this.userAddress,
      task_definition_id: taskDefinitionId,
      stake_amount: config.stakeAmount,
      token_amount: config.tokenAmount,
      priority: 1, // Default value
      security: 1, // Default value
      recurring: config.recurring ?? true,
      time_interval: config.timeInterval,
      time_frame: config.timeFrame || Math.floor(Date.now() / 1000),
      trigger_chain_id: config.targetChainId,
      trigger_contract_address: config.targetContractAddress,
      trigger_event: '',
      script_ipfs_url: config.scriptIpfsUrl || '',
      script_trigger_function: '',
      target_chain_id: config.targetChainId,
      target_contract_address: config.targetContractAddress,
      target_function: config.targetFunction,
      arg_type: config.argType,
      arguments: config.arguments || [],
      script_target_function: ''
    }];
    return this.createJob(jobData);
  }

  async createEventBasedJob(config: EventBasedJobConfig) {
    const taskDefinitionId = TaskDefinitionIds[JobType.EVENT][config.argType === 1 ? 'static' : 'dynamic'];
    
    if (config.argType !== 1 && !config.scriptIpfsUrl) {
      throw new Error('Dynamic jobs require scriptIpfsUrl');
    }

    if (config.argType === 1 && !config.arguments) {
      throw new Error('Static jobs require arguments');
    }

    const jobData: CreateJobRequest[] = [{
      user_address: this.userAddress,
      task_definition_id: taskDefinitionId,
      stake_amount: config.stakeAmount,
      token_amount: config.tokenAmount,
      priority: 1, // Default value
      security: 1, // Default value
      recurring: config.recurring ?? true,
      time_interval: 0,
      time_frame: config.timeFrame || Math.floor(Date.now() / 1000),
      trigger_chain_id: config.triggerChainId,
      trigger_contract_address: config.triggerContractAddress,
      trigger_event: config.triggerEvent,
      script_ipfs_url: config.scriptIpfsUrl || '',
      script_trigger_function: config.scriptTriggerFunction || '',
      target_chain_id: config.targetChainId,
      target_contract_address: config.targetContractAddress,
      target_function: config.targetFunction,
      arg_type: config.argType,
      arguments: config.arguments || [],
      script_target_function: ''
    }];
    return this.createJob(jobData);
  }

  async createConditionBasedJob(config: ConditionBasedJobConfig) {
    const taskDefinitionId = TaskDefinitionIds[JobType.CONDITION][config.argType === 1 ? 'static' : 'dynamic'];

    if (config.argType !== 1 && !config.scriptIpfsUrl) {
      throw new Error('Dynamic jobs require scriptIpfsUrl');
    }

    if (config.argType === 1 && !config.arguments) {
      throw new Error('Static jobs require arguments');
    }

    const jobData: CreateJobRequest[] = [{
      user_address: this.userAddress,
      task_definition_id: taskDefinitionId,
      stake_amount: config.stakeAmount,
      token_amount: config.tokenAmount,
      priority: 1, // Default value
      security: 1, // Default value
      recurring: config.recurring ?? true,
      time_interval: 0,
      time_frame: config.timeFrame || Math.floor(Date.now() / 1000),
      trigger_chain_id: config.triggerChainId,
      trigger_contract_address: config.triggerContractAddress,
      trigger_event: config.triggerEvent,
      script_ipfs_url: config.scriptIpfsUrl || '',
      script_trigger_function: '',
      target_chain_id: config.targetChainId,
      target_contract_address: config.targetContractAddress,
      target_function: config.targetFunction,
      arg_type: config.argType,
      arguments: config.arguments || [],
      script_target_function: ''
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