import { ethers } from 'ethers';
import { TriggerType, TaskType, TaskDefinitionIds, CreateJobOptions } from './types';

export class TriggerX {
  private readonly apiKey: string;
  private signer: ethers.Signer;
  private userAddress: string = '';

  constructor(apiKey: string, signer: ethers.Signer) {
    this.apiKey = apiKey;
    this.signer = signer;
  }

  static async create(apiKey: string, signer: ethers.Signer): Promise<TriggerX> {
    const instance = new TriggerX(apiKey, signer);
    instance.userAddress = await signer.getAddress();
    return instance;
  }

  async createJob(options: CreateJobOptions) {
    const taskDefinitionId = TaskDefinitionIds[options.triggerType][options.taskType];
    
    const jobData = [{
      user_address: this.userAddress,
      task_definition_id: taskDefinitionId,
      priority: options.priority || 1,
      security: options.security || 1,
      recurring: options.recurring ?? true,
      
      // Time specific
      time_interval: options.timeInterval,
      time_frame: options.startTime,
      
      // Event specific
      trigger_chain_id: options.eventConfig?.chainId,
      trigger_contract_address: options.eventConfig?.contractAddress,
      trigger_event: options.eventConfig?.eventName,
      
      // Condition specific
      script_ipfs_url: options.conditionConfig?.scriptIpfsUrl,
      script_trigger_function: options.conditionConfig?.scriptTriggerFunction,
      
      // Execution config
      target_chain_id: options.targetChainId,
      target_contract_address: options.targetContract,
      target_function: options.targetFunction,
      arguments: options.arguments
    }];

    // Make API call to create job
    const response = await this.makeRequest('POST', '/jobs/create', jobData);
    return response;
  }

  // Example usage of the SDK
  private async makeRequest(method: string, endpoint: string, data?: any) {
    // Implementation of API request logic
  }
} 