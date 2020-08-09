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
exports.CardController = void 0;
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../user/user.decorator");
const auth_guard_1 = require("../shared/auth.guard");
const validation_pipe_1 = require("../shared/validation.pipe");
const card_dto_1 = require("./card.dto");
const card_service_1 = require("./card.service");
let CardController = class CardController {
    constructor(cardService) {
        this.cardService = cardService;
        this.logger = new common_1.Logger('CardController');
    }
    showCardsByList(list, page) {
        return this.cardService.showByList(list, page);
    }
    createCard(list, user, data) {
        return this.cardService.create(list, user, data);
    }
    updateCard(id, user, data) {
        return this.cardService.update(id, user, data);
    }
    showCard(id) {
        return this.cardService.show(id);
    }
    destroyCard(id, user) {
        return this.cardService.destroy(id, user);
    }
};
__decorate([
    common_1.Get('list/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "showCardsByList", null);
__decorate([
    common_1.Post('list/:id'),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Param('id')),
    __param(1, user_decorator_1.User('id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, card_dto_1.CardDTO]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "createCard", null);
__decorate([
    common_1.Put(':id'),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Param('id')),
    __param(1, user_decorator_1.User('id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, card_dto_1.CardDTO]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "updateCard", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "showCard", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "destroyCard", null);
CardController = __decorate([
    common_1.Controller('api/cards'),
    __metadata("design:paramtypes", [card_service_1.CardService])
], CardController);
exports.CardController = CardController;
//# sourceMappingURL=card.controller.js.map