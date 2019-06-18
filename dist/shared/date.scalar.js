"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
let DateScalar = class DateScalar {
    constructor() {
        this.description = 'Date custom scalar type';
    }
    parseValue(value) {
        return new Date(value);
    }
    serialize(value) {
        return value.toISOString();
    }
    parseLiteral(ast) {
        if (ast.kind === graphql_2.Kind.INT) {
            return parseInt(ast.value, 10);
        }
        return null;
    }
};
DateScalar = __decorate([
    graphql_1.Scalar('Date')
], DateScalar);
exports.DateScalar = DateScalar;
//# sourceMappingURL=date.scalar.js.map