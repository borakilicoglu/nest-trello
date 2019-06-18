"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const idea_entity_1 = require("../idea/idea.entity");
const user_entity_1 = require("../user/user.entity");
const comment_controller_1 = require("./comment.controller");
const comment_service_1 = require("./comment.service");
const comment_entity_1 = require("./comment.entity");
const comment_resolver_1 = require("./comment.resolver");
let CommentModule = class CommentModule {
};
CommentModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([comment_entity_1.CommentEntity, idea_entity_1.IdeaEntity, user_entity_1.UserEntity])],
        controllers: [comment_controller_1.CommentController],
        providers: [comment_service_1.CommentService, comment_resolver_1.CommentResolver],
    })
], CommentModule);
exports.CommentModule = CommentModule;
//# sourceMappingURL=comment.module.js.map