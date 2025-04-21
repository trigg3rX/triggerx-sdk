# TriggerX SDK

Official TypeScript/JavaScript SDK for interacting with the TriggerX Network API.

## Installation

```bash
npm install triggerx-sdk
```

## Usage

```typescript
import { TriggerXSDK } from 'triggerx-sdk';

// Initialize the SDK with your API key
const sdk = new TriggerXSDK('your-api-key');

// Example: Create a new job
async function createJob() {
  const jobData = {
    user_address: '0x...',
    stake_amount: '1000000000000000000',
    token_amount: '1000000000000000000',
    task_definition_id: 1,
    priority: 2,
    security: 1,
    time_frame: 3600,
    recurring: true,
    time_interval: 300,
    trigger_chain_id: '1',
    trigger_contract_address: '0x...',
    trigger_event: 'Transfer',
    script_ipfs_url: 'ipfs://...',
    script_trigger_function: 'checkCondition',
    target_chain_id: '1',
    target_contract_address: '0x...',
    target_function: 'execute',
    arg_type: 1,
    arguments: ['arg1', 'arg2'],
    script_target_function: 'executeAction'
  };

  try {
    const result = await sdk.createJob([jobData]);
    console.log('Job created:', result);
  } catch (error) {
    console.error('Error creating job:', error);
  }
}

// Example: Get user data
async function getUserData(userId: number) {
  try {
    const userData = await sdk.getUserData(userId);
    console.log('User data:', userData);
  } catch (error) {
    console.error('Error getting user data:', error);
  }
}

// Example: Get wallet points
async function getWalletPoints(walletAddress: string) {
  try {
    const points = await sdk.getWalletPoints(walletAddress);
    console.log('Wallet points:', points);
  } catch (error) {
    console.error('Error getting wallet points:', error);
  }
}
```

## Available Methods

### User Methods
- `getUserData(userId: number)`: Get user data by ID
- `getWalletPoints(walletAddress: string)`: Get wallet points

### Job Methods
- `createJob(jobData: CreateJobRequest[])`: Create new job(s)
- `getJobData(jobId: number)`: Get job data by ID
- `updateJob(jobId: number, updateData: UpdateJobRequest)`: Update job
- `updateJobLastExecuted(jobId: number)`: Update job's last execution time
- `getJobsByUserAddress(userAddress: string)`: Get all jobs for a user
- `deleteJob(jobId: number)`: Delete a job

## Error Handling

The SDK uses axios for HTTP requests. All methods return promises and can throw errors. It's recommended to use try-catch blocks when calling SDK methods.

## Types

The SDK includes TypeScript types for all request and response objects. You can import them directly:

```typescript
import { 
  UserData, 
  JobData, 
  CreateJobRequest, 
  UpdateJobRequest 
} from 'triggerx-sdk';
```

## License

MIT