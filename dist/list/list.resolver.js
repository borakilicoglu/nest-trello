"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.ListResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const list_service_1 = require("./list.service");
const auth_guard_1 = require("../shared/auth.guard");
let ListResolver = class ListResolver {
    constructor(listService) {
        this.listService = listService;
    }
    lists(boardId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.listService.showByBoard(boardId, page);
        });
    }
    list(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.listService.show(id);
        });
    }
    createList(boardId, name, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = user;
            const data = { name };
            return yield this.listService.create(boardId, userId, data);
        });
    }
    deleteList(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = user;
            return yield this.listService.destroy(id, userId);
        });
    }
};
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('boardId')), __param(1, graphql_1.Args('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ListResolver.prototype, "lists", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ListResolver.prototype, "list", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('board')),
    __param(1, graphql_1.Args('name')),
    __param(2, graphql_1.Context('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ListResolver.prototype, "createList", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Context('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ListResolver.prototype, "deleteList", null);
ListResolver = __decorate([
    graphql_1.Resolver('List'),
    __metadata("design:paramtypes", [list_service_1.ListService])
], ListResolver);
exports.ListResolver = ListResolver;
//# sourceMappingURL=list.resolver.js.map