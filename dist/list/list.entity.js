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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListEntity = void 0;
const typeorm_1 = require("typeorm");
const board_entity_1 = require("../board/board.entity");
const user_entity_1 = require("../user/user.entity");
const card_entity_1 = require("../card/card.entity");
let ListEntity = class ListEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], ListEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], ListEntity.prototype, "created", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], ListEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity),
    typeorm_1.JoinTable(),
    __metadata("design:type", user_entity_1.UserEntity)
], ListEntity.prototype, "author", void 0);
__decorate([
    typeorm_1.ManyToOne(type => board_entity_1.BoardEntity, board => board.lists, { onDelete: 'CASCADE' }),
    __metadata("design:type", board_entity_1.BoardEntity)
], ListEntity.prototype, "board", void 0);
__decorate([
    typeorm_1.OneToMany(type => card_entity_1.CardEntity, card => card.list, { cascade: true }),
    __metadata("design:type", Array)
], ListEntity.prototype, "cards", void 0);
ListEntity = __decorate([
    typeorm_1.Entity('list')
], ListEntity);
exports.ListEntity = ListEntity;
//# sourceMappingURL=list.entity.js.map