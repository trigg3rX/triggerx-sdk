# TriggerX SDK

Official TypeScript/JavaScript SDK for interacting with the TriggerX Network API. This SDK allows you to create and manage automated blockchain tasks with different trigger types: Time-based, Event-based, and Condition-based.

## Installation

```bash
npm install triggerx-sdk
```

## Quick Start

```typescript
import { TriggerXSDK } from 'triggerx-sdk';
import { ethers } from 'ethers';

// Initialize provider and signer
const provider = new ethers.JsonRpcProvider('YOUR_RPC_URL');
const privateKey = 'YOUR_PRIVATE_KEY';
const signer = new ethers.Wallet(privateKey, provider);

// Initialize SDK
const sdk = new TriggerXSDK('your-api-key');

// Create a simple time-based job
async function createTimeBasedJob() {
  const job = await sdk.createStaticTimeBasedJob({
    userAddress: await signer.getAddress(),
    timeInterval: 3600, // 1 hour
    targetChainId: '1',
    targetContract: '0x...', // Your target contract
    targetFunction: 'executeDaily',
    arguments: ['param1', 'param2'],
    stake_amount: '1000000000000000000', // 1 ETH
    token_amount: '1000000000000000000'
  });
  console.log('Job created:', job);
}
```

## Job Types

### 1. Time-Based Jobs

#### Static Time-Based Job
```typescript
const staticTimeJob = await sdk.createStaticTimeBasedJob({
  userAddress: walletAddress,
  timeInterval: 3600, // Execute every hour
  targetChainId: '1',
  targetContract: '0x...',
  targetFunction: 'executeDaily',
  arguments: ['param1'],
  priority: 1,
  security: 1,
  recurring: true
});
```

#### Dynamic Time-Based Job
```typescript
const dynamicTimeJob = await sdk.createDynamicTimeBasedJob({
  userAddress: walletAddress,
  timeInterval: 3600,
  targetChainId: '1',
  targetContract: '0x...',
  targetFunction: 'executeDaily',
  scriptIpfsUrl: 'ipfs://...', // Required for dynamic jobs
  scriptTriggerFunction: 'checkCondition', // Required for dynamic jobs
  arguments: ['param1']
});
```

### 2. Event-Based Jobs

#### Static Event-Based Job
```typescript
const staticEventJob = await sdk.createStaticEventBasedJob({
  userAddress: walletAddress,
  triggerChainId: '1',
  triggerContract: '0x...', // Contract to monitor
  eventName: 'Transfer',
  targetChainId: '1',
  targetContract: '0x...', // Contract to execute
  targetFunction: 'handleTransfer',
  arguments: []
});
```

#### Dynamic Event-Based Job
```typescript
const dynamicEventJob = await sdk.createDynamicEventBasedJob({
  userAddress: walletAddress,
  triggerChainId: '1',
  triggerContract: '0x...',
  eventName: 'Transfer',
  targetChainId: '1',
  targetContract: '0x...',
  targetFunction: 'handleTransfer',
  scriptIpfsUrl: 'ipfs://...',
  scriptTriggerFunction: 'processTransfer',
  arguments: []
});
```

### 3. Condition-Based Jobs

#### Static Condition-Based Job
```typescript
const staticConditionJob = await sdk.createStaticConditionBasedJob({
  userAddress: walletAddress,
  targetChainId: '1',
  targetContract: '0x...',
  targetFunction: 'executeSwap',
  scriptIpfsUrl: 'ipfs://...',
  scriptTriggerFunction: 'checkPrice',
  arguments: ['1000000000000000000']
});
```

#### Dynamic Condition-Based Job
```typescript
const dynamicConditionJob = await sdk.createDynamicConditionBasedJob({
  userAddress: walletAddress,
  targetChainId: '1',
  targetContract: '0x...',
  targetFunction: 'executeSwap',
  scriptIpfsUrl: 'ipfs://...',
  scriptTriggerFunction: 'checkPrice',
  arguments: ['1000000000000000000']
});
```

## Job Configuration Options

### Common Options (All Job Types)
- `userAddress`: Wallet address of the job creator
- `targetChainId`: Chain ID where the job will execute
- `targetContract`: Contract address to execute
- `targetFunction`: Function to call on the target contract
- `arguments`: Array of arguments for the target function
- `stake_amount`: Amount to stake (optional)
- `token_amount`: Amount of tokens (optional)
- `priority`: Job priority (default: 1)
- `security`: Security level (default: 1)
- `recurring`: Whether the job should repeat (default: true)

### Time-Based Job Options
- `timeInterval`: Interval in seconds between executions
- `startTime`: Optional start time (timestamp)

### Event-Based Job Options
- `triggerChainId`: Chain ID to monitor for events
- `triggerContract`: Contract address to monitor
- `eventName`: Name of the event to monitor

### Condition-Based Job Options
- `scriptIpfsUrl`: IPFS URL of the condition script
- `scriptTriggerFunction`: Function name in the script to check conditions

## User Methods

```typescript
// Get user data
const userData = await sdk.getUserData(userId);

// Get wallet points
const points = await sdk.getWalletPoints(walletAddress);
```

## Job Management Methods

```typescript
// Get job data
const jobData = await sdk.getJobData(jobId);

// Update job
await sdk.updateJob(jobId, {
  recurring: true,
  time_frame: 3600
});

// Update job's last execution time
await sdk.updateJobLastExecuted(jobId);

// Get all jobs for a user
const userJobs = await sdk.getJobsByUserAddress(walletAddress);
```

## Error Handling

The SDK uses axios for HTTP requests. Always wrap SDK calls in try-catch blocks:

```typescript
try {
  const job = await sdk.createStaticTimeBasedJob({...});
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error('API Error:', error.response?.data);
  } else {
    console.error('Error:', error);
  }
}
```

## TypeScript Support

The SDK includes TypeScript definitions for all types. Import them as needed:

```typescript
import {
  TimeBasedJobConfig,
  EventBasedJobConfig,
  ConditionBasedJobConfig,
  JobData,
  UserData
} from 'triggerx-sdk';
```

## License

MIT