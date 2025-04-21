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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriggerXSDK = void 0;
const axios_1 = __importDefault(require("axios"));
class TriggerXSDK {
    constructor(apiKey, baseURL = 'http://192.168.1.57:9002/') {
        this.client = axios_1.default.create({
            baseURL,
            headers: {
                'X-Api-Key': apiKey,
                'Content-Type': 'application/json',
            },
        });
    }
    // User endpoints
    getUserData(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.get(`/api/users/${userId}`);
            return response.data;
        });
    }
    getWalletPoints(walletAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.get(`/api/wallet/points/${walletAddress}`);
            return response.data;
        });
    }
    // Job endpoints
    createJob(jobData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.post('/api/jobs', jobData);
            return response.data;
        });
    }
    getJobData(jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.get(`/api/jobs/${jobId}`);
            return response.data;
        });
    }
    updateJob(jobId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.put(`/api/jobs/${jobId}`, updateData);
        });
    }
    updateJobLastExecuted(jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.put(`/api/jobs/${jobId}/lastexecuted`);
        });
    }
    getJobsByUserAddress(userAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.get(`/api/jobs/user/${userAddress}`);
            return response.data;
        });
    }
    deleteJob(jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.put(`/api/jobs/delete/${jobId}`);
        });
    }
}
exports.TriggerXSDK = TriggerXSDK;
