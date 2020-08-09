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
exports.CardResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const card_service_1 = require("./card.service");
const auth_guard_1 = require("../shared/auth.guard");
let CardResolver = class CardResolver {
    constructor(cardService) {
        this.cardService = cardService;
    }
    card(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.cardService.show(id);
        });
    }
    createCard(listId, name, description, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = user;
            const data = { name, description };
            return yield this.cardService.create(listId, userId, data);
        });
    }
    deleteCard(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = user;
            return yield this.cardService.destroy(id, userId);
        });
    }
};
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CardResolver.prototype, "card", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('list')),
    __param(1, graphql_1.Args('name')),
    __param(2, graphql_1.Args('description')),
    __param(3, graphql_1.Context('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], CardResolver.prototype, "createCard", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Context('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CardResolver.prototype, "deleteCard", null);
CardResolver = __decorate([
    graphql_1.Resolver('Card'),
    __metadata("design:paramtypes", [card_service_1.CardService])
], CardResolver);
exports.CardResolver = CardResolver;
//# sourceMappingURL=card.resolver.js.map