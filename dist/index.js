"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriggerX = void 0;
const types_1 = require("./types");
class TriggerX {
    constructor(apiKey, signer) {
        this.userAddress = '';
        this.apiKey = apiKey;
        this.signer = signer;
    }
    static create(apiKey, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = new TriggerX(apiKey, signer);
            instance.userAddress = yield signer.getAddress();
            return instance;
        });
    }
    createJob(options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const taskDefinitionId = types_1.TaskDefinitionIds[options.triggerType][options.taskType];
            const jobData = [{
                    user_address: this.userAddress,
                    task_definition_id: taskDefinitionId,
                    priority: options.priority || 1,
                    security: options.security || 1,
                    recurring: (_a = options.recurring) !== null && _a !== void 0 ? _a : true,
                    // Time specific
                    time_interval: options.timeInterval,
                    time_frame: options.startTime,
                    // Event specific
                    trigger_chain_id: (_b = options.eventConfig) === null || _b === void 0 ? void 0 : _b.chainId,
                    trigger_contract_address: (_c = options.eventConfig) === null || _c === void 0 ? void 0 : _c.contractAddress,
                    trigger_event: (_d = options.eventConfig) === null || _d === void 0 ? void 0 : _d.eventName,
                    // Condition specific
                    script_ipfs_url: (_e = options.conditionConfig) === null || _e === void 0 ? void 0 : _e.scriptIpfsUrl,
                    script_trigger_function: (_f = options.conditionConfig) === null || _f === void 0 ? void 0 : _f.scriptTriggerFunction,
                    // Execution config
                    target_chain_id: options.targetChainId,
                    target_contract_address: options.targetContract,
                    target_function: options.targetFunction,
                    arguments: options.arguments
                }];
            // Make API call to create job
            const response = yield this.makeRequest('POST', '/jobs/create', jobData);
            return response;
        });
    }
    // Example usage of the SDK
    makeRequest(method, endpoint, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implementation of API request logic
        });
    }
}
exports.TriggerX = TriggerX;
