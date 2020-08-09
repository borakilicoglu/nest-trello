"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const board_entity_1 = require("../board/board.entity");
const user_entity_1 = require("../user/user.entity");
const card_service_1 = require("../card/card.service");
const card_entity_1 = require("../card/card.entity");
const list_controller_1 = require("./list.controller");
const list_service_1 = require("./list.service");
const list_entity_1 = require("./list.entity");
const list_resolver_1 = require("./list.resolver");
const app_gateway_1 = require("../app.gateway");
let ListModule = class ListModule {
};
ListModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([list_entity_1.ListEntity, board_entity_1.BoardEntity, card_entity_1.CardEntity, user_entity_1.UserEntity])],
        controllers: [list_controller_1.ListController],
        providers: [list_service_1.ListService, list_resolver_1.ListResolver, card_service_1.CardService, app_gateway_1.AppGateway],
    })
], ListModule);
exports.ListModule = ListModule;
//# sourceMappingURL=list.module.js.map