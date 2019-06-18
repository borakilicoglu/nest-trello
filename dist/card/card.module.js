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
const list_entity_1 = require("../list/list.entity");
const user_entity_1 = require("../user/user.entity");
const card_controller_1 = require("./card.controller");
const card_service_1 = require("./card.service");
const card_entity_1 = require("./card.entity");
const card_resolver_1 = require("./card.resolver");
let CardModule = class CardModule {
};
CardModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([card_entity_1.CardEntity, list_entity_1.ListEntity, user_entity_1.UserEntity])],
        controllers: [card_controller_1.CardController],
        providers: [card_service_1.CardService, card_resolver_1.CardResolver],
    })
], CardModule);
exports.CardModule = CardModule;
//# sourceMappingURL=card.module.js.map