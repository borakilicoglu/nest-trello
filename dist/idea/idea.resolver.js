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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const comment_service_1 = require("../comment/comment.service");
const auth_gaurd_1 = require("../shared/auth.gaurd");
const idea_service_1 = require("./idea.service");
const idea_dto_1 = require("./idea.dto");
let IdeaResolver = class IdeaResolver {
    constructor(ideaService, commentService) {
        this.ideaService = ideaService;
        this.commentService = commentService;
    }
    ideas(page, newest) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ideaService.showAll(page, newest);
        });
    }
    idea(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ideaService.read(id);
        });
    }
    createIdea(id, { idea, description }, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = user;
            const data = { idea, description };
            return yield this.ideaService.create(userId, data);
        });
    }
    updateIdea(id, { idea, description }, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = user;
            let data = {};
            idea && (data.idea = idea);
            description && (data.description = description);
            return yield this.ideaService.update(id, userId, data);
        });
    }
    deleteIdea(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = user;
            return yield this.ideaService.destroy(id, userId);
        });
    }
    upvote(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = user;
            return yield this.ideaService.upvote(id, userId);
        });
    }
    downvote(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = user;
            return yield this.ideaService.downvote(id, userId);
        });
    }
    bookmark(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = user;
            return yield this.ideaService.bookmark(id, userId);
        });
    }
    unbookmark(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = user;
            return yield this.ideaService.unbookmark(id, userId);
        });
    }
    comments(idea) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = idea;
            return yield this.commentService.showByIdea(id);
        });
    }
};
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('page')), __param(1, graphql_1.Args('newest')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", Promise)
], IdeaResolver.prototype, "ideas", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IdeaResolver.prototype, "idea", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, graphql_1.Args('id')),
    __param(1, graphql_1.Args()),
    __param(2, graphql_1.Context('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, idea_dto_1.IdeaDTO, Object]),
    __metadata("design:returntype", Promise)
], IdeaResolver.prototype, "createIdea", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, graphql_1.Args('id')),
    __param(1, graphql_1.Args()),
    __param(2, graphql_1.Context('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, idea_dto_1.IdeaDTO, Object]),
    __metadata("design:returntype", Promise)
], IdeaResolver.prototype, "updateIdea", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Context('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], IdeaResolver.prototype, "deleteIdea", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Context('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], IdeaResolver.prototype, "upvote", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Context('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], IdeaResolver.prototype, "downvote", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Context('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], IdeaResolver.prototype, "bookmark", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Context('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], IdeaResolver.prototype, "unbookmark", null);
__decorate([
    graphql_1.ResolveProperty(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IdeaResolver.prototype, "comments", null);
IdeaResolver = __decorate([
    graphql_1.Resolver('Idea'),
    __metadata("design:paramtypes", [idea_service_1.IdeaService,
        comment_service_1.CommentService])
], IdeaResolver);
exports.IdeaResolver = IdeaResolver;
//# sourceMappingURL=idea.resolver.js.map