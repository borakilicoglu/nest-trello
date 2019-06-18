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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../user/user.decorator");
const auth_gaurd_1 = require("../shared/auth.gaurd");
const validation_pipe_1 = require("../shared/validation.pipe");
const comment_dto_1 = require("./comment.dto");
const comment_service_1 = require("./comment.service");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
        this.logger = new common_1.Logger('CommentController');
    }
    showCommentsByIdea(idea, page) {
        return this.commentService.showByIdea(idea, page);
    }
    createComment(idea, user, data) {
        return this.commentService.create(idea, user, data);
    }
    showCommentsByUser(user, page) {
        return this.commentService.showByUser(user, page);
    }
    showComment(id) {
        return this.commentService.show(id);
    }
    destroyComment(id, user) {
        return this.commentService.destroy(id, user);
    }
};
__decorate([
    common_1.Get('idea/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "showCommentsByIdea", null);
__decorate([
    common_1.Post('idea/:id'),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Param('id')),
    __param(1, user_decorator_1.User('id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, comment_dto_1.CommentDTO]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "createComment", null);
__decorate([
    common_1.Get('user/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "showCommentsByUser", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "showComment", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "destroyComment", null);
CommentController = __decorate([
    common_1.Controller('api/comments'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map