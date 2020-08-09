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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../shared/auth.guard");
const comment_service_1 = require("../comment/comment.service");
const user_service_1 = require("./user.service");
let UserResolver = class UserResolver {
    constructor(userService, commentService) {
        this.userService = userService;
        this.commentService = commentService;
    }
    users(page) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.showAll(page);
        });
    }
    user(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.read(username);
        });
    }
    whoami(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = user;
            return yield this.userService.read(username);
        });
    }
    login(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = { username, email, password };
            return yield this.userService.login(user);
        });
    }
    register(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = { username, email, password };
            return yield this.userService.register(user);
        });
    }
    comments(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = user;
            return yield this.commentService.showByUser(id);
        });
    }
};
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    graphql_1.Query(),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Context('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "whoami", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('username')),
    __param(1, graphql_1.Args('email')),
    __param(2, graphql_1.Args('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('username')),
    __param(1, graphql_1.Args('email')),
    __param(2, graphql_1.Args('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "comments", null);
UserResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        comment_service_1.CommentService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map