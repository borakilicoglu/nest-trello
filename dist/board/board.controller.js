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
const validation_pipe_1 = require("../shared/validation.pipe");
const auth_gaurd_1 = require("../shared/auth.gaurd");
const board_service_1 = require("./board.service");
const board_dto_1 = require("./board.dto");
let BoardController = class BoardController {
    constructor(boardService) {
        this.boardService = boardService;
        this.logger = new common_1.Logger('BoardController');
    }
    logData(options) {
        options.user && this.logger.log('USER ' + JSON.stringify(options.user));
        options.body && this.logger.log('BODY ' + JSON.stringify(options.body));
        options.id && this.logger.log('BOARD' + JSON.stringify(options.id));
    }
    showAllIBoards(page) {
        return this.boardService.showAll(page);
    }
    showNewestBoards(page) {
        return this.boardService.showAll(page, true);
    }
    createBoard(user, body) {
        this.logData({ user, body });
        return this.boardService.create(user, body);
    }
    readBoard(id) {
        this.logData({ id });
        return this.boardService.read(id);
    }
    updateBoard(id, user, body) {
        this.logData({ id, user, body });
        return this.boardService.update(id, user, body);
    }
    destroyBoard(id, user) {
        this.logData({ id, user });
        return this.boardService.destroy(id, user);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "showAllIBoards", null);
__decorate([
    common_1.Get('/newest'),
    __param(0, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "showNewestBoards", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, user_decorator_1.User('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, board_dto_1.BoardDTO]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "createBoard", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "readBoard", null);
__decorate([
    common_1.Put(':id'),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Param('id')),
    __param(1, user_decorator_1.User('id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "updateBoard", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "destroyBoard", null);
BoardController = __decorate([
    common_1.Controller('api/boards'),
    __metadata("design:paramtypes", [board_service_1.BoardService])
], BoardController);
exports.BoardController = BoardController;
//# sourceMappingURL=board.controller.js.map