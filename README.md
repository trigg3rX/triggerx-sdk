# TriggerX SDK

Official TypeScript/JavaScript SDK for interacting with the TriggerX Network API. This SDK allows you to create and manage automated blockchain tasks with three types of jobs: Time-based, Event-based, and Condition-based. Each job type supports both static and dynamic execution modes.

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
const sdk = new TriggerXSDK(apiKey, userAddress, baseURL);

// Create a simple time-based job
async function createTimeBasedJob() {
  const job = await sdk.createTimeBasedJob({
    userAddress: await signer.getAddress(),
    timeInterval: 3600, // 1 hour
    targetChainId: '1',
    targetContract: '0x...', // Your target contract
    targetFunction: 'executeDaily',
    arguments: ['param1', 'param2'],
    isDynamic: false, // Static execution mode
    stake_amount: '1000000000000000000', // 1 ETH
    token_amount: '1000000000000000000'
  });
  console.log('Job created:', job);
}

// Static job
await sdk.createTimeBasedJob({
  stakeAmount: "1000",
  tokenAmount: "100",
  timeInterval: 3600,
  targetChainId: "1",
  targetContractAddress: "0x...",
  targetFunction: "execute",
  argType: 1,
  arguments: ["arg1", "arg2"]
});

// Dynamic job
await sdk.createTimeBasedJob({
  stakeAmount: "1000",
  tokenAmount: "100",
  timeInterval: 3600,
  targetChainId: "1",
  targetContractAddress: "0x...",
  targetFunction: "execute",
  argType: 2,
  scriptIpfsUrl: "ipfs://..."
});
```

## Job Types and Execution Modes

### 1. Time-Based Jobs
```typescript
// Static Time-Based Job
const staticTimeJob = await sdk.createTimeBasedJob({
  userAddress: walletAddress,
  timeInterval: 3600, // Execute every hour
  targetChainId: '1',
  targetContract: '0x...',
  targetFunction: 'executeDaily',
  isDynamic: false, // Static mode
  arguments: ['param1']
});

// Dynamic Time-Based Job
const dynamicTimeJob = await sdk.createTimeBasedJob({
  userAddress: walletAddress,
  timeInterval: 3600,
  targetChainId: '1',
  targetContract: '0x...',
  targetFunction: 'executeDaily',
  isDynamic: true, // Dynamic mode
  scriptIpfsUrl: 'ipfs://...', // Required for dynamic jobs
  scriptTriggerFunction: 'checkCondition', // Required for dynamic jobs
  arguments: ['param1']
});
```

### 2. Event-Based Jobs
```typescript
// Static Event-Based Job
const staticEventJob = await sdk.createEventBasedJob({
  stakeAmount: "1000",
  tokenAmount: "100",
  triggerChainId: "1",
  triggerContractAddress: "0x...",
  triggerEvent: "Transfer",
  targetChainId: "1",
  targetContractAddress: "0x...",
  targetFunction: "execute",
  argType: 1,
  arguments: ["arg1", "arg2"]
});

// Dynamic Event-Based Job
const dynamicEventJob = await sdk.createEventBasedJob({
  stakeAmount: "1000",
  tokenAmount: "100",
  triggerChainId: "1",
  triggerContractAddress: "0x...",
  triggerEvent: "Transfer",
  targetChainId: "1",
  targetContractAddress: "0x...",
  targetFunction: "execute",
  argType: 2,
  scriptIpfsUrl: "ipfs://..."
});
```

### 3. Condition-Based Jobs
```typescript
// Static Condition-Based Job
const staticConditionJob = await sdk.createConditionBasedJob({
  stakeAmount: "1000",
  tokenAmount: "100",
  triggerChainId: "1",
  triggerContractAddress: "0x...",
  triggerEvent: "Check",
  targetChainId: "1",
  targetContractAddress: "0x...",
  targetFunction: "execute",
  argType: 1,
  arguments: ["arg1", "arg2"]
});

// Dynamic Condition-Based Job
const dynamicConditionJob = await sdk.createConditionBasedJob({
  stakeAmount: "1000",
  tokenAmount: "100",
  triggerChainId: "1",
  triggerContractAddress: "0x...",
  triggerEvent: "Check",
  targetChainId: "1",
  targetContractAddress: "0x...",
  targetFunction: "execute",
  argType: 2,
  scriptIpfsUrl: "ipfs://..."
});
```

## Job Configuration Options

### Common Options (All Job Types)
- `userAddress`: Wallet address of the job creator
- `targetChainId`: Chain ID where the job will execute
- `targetContract`: Contract address to execute
- `targetFunction`: Function to call on the target contract
- `arguments`: Array of arguments for the target function
- `isDynamic`: Whether to use dynamic execution mode (requires script configuration)
- `stake_amount`: Amount to stake (optional)
- `token_amount`: Amount of tokens (optional)
- `priority`: Job priority (default: 1)
- `security`: Security level (default: 1)
- `recurring`: Whether the job should repeat (default: true)

### Dynamic Mode Options
When `isDynamic` is true, these options are required:
- `scriptIpfsUrl`: IPFS URL of the execution script
- `scriptTriggerFunction`: Function name in the script to execute

### Job-Specific Options

#### Time-Based Jobs
- `timeInterval`: Interval in seconds between executions
- `startTime`: Optional start time (timestamp)

#### Event-Based Jobs
- `triggerChainId`: Chain ID to monitor for events
- `triggerContract`: Contract address to monitor
- `triggerEvent`: Name of the event to monitor

#### Condition-Based Jobs
Always requires:
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
  const job = await sdk.createTimeBasedJob({
    isDynamic: false,
    // ... other config
  });
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
  UserData,
  JobType
} from 'triggerx-sdk';
```

## License

MIT