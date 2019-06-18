"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const http_error_filter_1 = require("./shared/http-error.filter");
const logging_interceptor_1 = require("./shared/logging.interceptor");
const idea_module_1 = require("./idea/idea.module");
const user_module_1 = require("./user/user.module");
const comment_module_1 = require("./comment/comment.module");
const board_module_1 = require("./board/board.module");
const card_module_1 = require("./card/card.module");
const list_module_1 = require("./list/list.module");
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    common_1.Module({
        imports: [idea_module_1.IdeaModule, user_module_1.UserModule, comment_module_1.CommentModule, board_module_1.BoardModule, list_module_1.ListModule, card_module_1.CardModule],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: http_error_filter_1.HttpErrorFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging_interceptor_1.LoggingInterceptor,
            }
        ],
        exports: [idea_module_1.IdeaModule, user_module_1.UserModule, comment_module_1.CommentModule, board_module_1.BoardModule, list_module_1.ListModule, card_module_1.CardModule],
        controllers: [],
    })
], ApiModule);
exports.ApiModule = ApiModule;
//# sourceMappingURL=api.module.js.map