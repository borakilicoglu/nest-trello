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
exports.BoardResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../shared/auth.guard");
const board_service_1 = require("./board.service");
const board_dto_1 = require("./board.dto");
let BoardResolver = class BoardResolver {
    constructor(boardService) {
        this.boardService = boardService;
    }
    boards(page, user, newest) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.boardService.showAll(page, user, newest);
        });
    }
    board(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.boardService.read(id, user);
        });
    }
    createBoard(id, { name }, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = user;
            const data = { name };
            return yield this.boardService.create(userId, data);
        });
    }
    updateBoard(id, { name }, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = user;
            let data = {};
            name && (data.name = name);
            return yield this.boardService.update(id, userId, data);
        });
    }
    deleteBoard(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = user;
            return yield this.boardService.destroy(id, userId);
        });
    }
    addStar(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = user;
            return yield this.boardService.addStar(id, userId);
        });
    }
    removeStar(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = user;
            return yield this.boardService.removeStar(id, userId);
        });
    }
};
__decorate([
    graphql_1.Query(),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('page')),
    __param(1, graphql_1.Context('user')),
    __param(2, graphql_1.Args('newest')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Boolean]),
    __metadata("design:returntype", Promise)
], BoardResolver.prototype, "boards", null);
__decorate([
    graphql_1.Query(),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Context('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BoardResolver.prototype, "board", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('id')),
    __param(1, graphql_1.Args()),
    __param(2, graphql_1.Context('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, board_dto_1.BoardDTO, Object]),
    __metadata("design:returntype", Promise)
], BoardResolver.prototype, "createBoard", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('id')),
    __param(1, graphql_1.Args()),
    __param(2, graphql_1.Context('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, board_dto_1.BoardDTO, Object]),
    __metadata("design:returntype", Promise)
], BoardResolver.prototype, "updateBoard", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Context('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BoardResolver.prototype, "deleteBoard", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Context('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BoardResolver.prototype, "addStar", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Context('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BoardResolver.prototype, "removeStar", null);
BoardResolver = __decorate([
    graphql_1.Resolver('Board'),
    __metadata("design:paramtypes", [board_service_1.BoardService])
], BoardResolver);
exports.BoardResolver = BoardResolver;
//# sourceMappingURL=board.resolver.js.map