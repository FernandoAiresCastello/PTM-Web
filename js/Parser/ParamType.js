"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamType = void 0;
var ParamType;
(function (ParamType) {
    ParamType[ParamType["Undefined"] = 0] = "Undefined";
    ParamType[ParamType["NumberLiteral"] = 1] = "NumberLiteral";
    ParamType[ParamType["CharLiteral"] = 2] = "CharLiteral";
    ParamType[ParamType["StringLiteral"] = 3] = "StringLiteral";
    ParamType[ParamType["Identifier"] = 4] = "Identifier";
    ParamType[ParamType["ArrayIxLiteral"] = 5] = "ArrayIxLiteral";
    ParamType[ParamType["ArrayIxVarIdentifier"] = 6] = "ArrayIxVarIdentifier"; // array[var_id]
})(ParamType = exports.ParamType || (exports.ParamType = {}));
