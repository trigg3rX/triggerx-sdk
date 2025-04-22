"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDefinitionIds = exports.TaskType = exports.TriggerType = void 0;
var TriggerType;
(function (TriggerType) {
    TriggerType["TIME"] = "TIME";
    TriggerType["CONDITION"] = "CONDITION";
    TriggerType["EVENT"] = "EVENT";
})(TriggerType || (exports.TriggerType = TriggerType = {}));
var TaskType;
(function (TaskType) {
    TaskType["STATIC"] = "STATIC";
    TaskType["DYNAMIC"] = "DYNAMIC";
})(TaskType || (exports.TaskType = TaskType = {}));
// Task Definition IDs mapping
exports.TaskDefinitionIds = {
    [TriggerType.TIME]: {
        [TaskType.STATIC]: 1,
        [TaskType.DYNAMIC]: 2
    },
    [TriggerType.CONDITION]: {
        [TaskType.STATIC]: 3,
        [TaskType.DYNAMIC]: 4
    },
    [TriggerType.EVENT]: {
        [TaskType.STATIC]: 5,
        [TaskType.DYNAMIC]: 6
    }
};
