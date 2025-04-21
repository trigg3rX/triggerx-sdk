import axios, { AxiosInstance } from 'axios';
import {
  UserData,
  JobData,
  CreateJobRequest,
  UpdateJobRequest,
  JobSummary,
  WalletPoints,
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