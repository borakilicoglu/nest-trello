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
const user_entity_1 = require("../user/user.entity");
const list_entity_1 = require("../list/list.entity");
const list_service_1 = require("../list/list.service");
const board_controller_1 = require("./board.controller");
const board_entity_1 = require("./board.entity");
const board_service_1 = require("./board.service");
const board_resolver_1 = require("./board.resolver");
const app_gateway_1 = require("../app.gateway");
let BoardModule = class BoardModule {
};
BoardModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([board_entity_1.BoardEntity, user_entity_1.UserEntity, list_entity_1.ListEntity])],
        controllers: [board_controller_1.BoardController],
        providers: [board_service_1.BoardService, board_resolver_1.BoardResolver, list_service_1.ListService, app_gateway_1.AppGateway],
    })
], BoardModule);
exports.BoardModule = BoardModule;
//# sourceMappingURL=board.module.js.map