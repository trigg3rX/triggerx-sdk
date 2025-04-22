import { ethers } from 'ethers';
import { CreateJobOptions } from './types';
export declare class TriggerX {
    private readonly apiKey;
    private signer;
    private userAddress;
    constructor(apiKey: string, signer: ethers.Signer);
    static create(apiKey: string, signer: ethers.Signer): Promise<TriggerX>;
    createJob(options: CreateJobOptions): Promise<void>;
    private makeRequest;
}
