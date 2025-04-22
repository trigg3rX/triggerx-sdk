import { TriggerX } from '../src';
import { ethers } from 'ethers';

async function main() {
  // Initialize provider and signer
  const provider = new ethers.JsonRpcProvider('YOUR_RPC_URL');
  const privateKey = 'YOUR_PRIVATE_KEY';
  const signer = new ethers.Wallet(privateKey, provider);
  
  // Create SDK instance
  const sdk = await TriggerX.create('your-api-key', signer);

  // Example 1: Static Time-based Job
  const timeJob = await sdk.createStaticTimeBasedJob({
    userAddress: await signer.getAddress(),
    timeInterval: 3600, // 1 hour
    targetChainId: '1',
    targetContract: '0x456...',
    targetFunction: 'executeDaily',
    arguments: ['param1', 'param2'],
    stake_amount: '1000000000000000000', // 1 ETH
    token_amount: '1000000000000000000'
  });

  // Example 2: Dynamic Event-based Job
  const eventJob = await sdk.createDynamicEventBasedJob({
    userAddress: await signer.getAddress(),
    triggerChainId: '1',
    triggerContract: '0x789...',
    eventName: 'Transfer',
    targetChainId: '1',
    targetContract: '0x456...',
    targetFunction: 'handleTransfer',
    scriptIpfsUrl: 'ipfs://Qm...',
    scriptTriggerFunction: 'processTransfer',
    arguments: []
  });

  // Example 3: Static Condition-based Job
  const conditionJob = await sdk.createStaticConditionBasedJob({
    userAddress: await signer.getAddress(),
    targetChainId: '1',
    targetContract: '0x456...',
    targetFunction: 'executeSwap',
    scriptIpfsUrl: 'ipfs://Qm...',
    scriptTriggerFunction: 'checkPrice',
    arguments: ['1000000000000000000'],
    priority: 2,
    security: 1,
    recurring: true
  });

  console.log('Time-based job created:', timeJob);
  console.log('Event-based job created:', eventJob);
  console.log('Condition-based job created:', conditionJob);
}

main().catch(console.error); 