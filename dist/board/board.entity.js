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
exports.BoardEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const list_entity_1 = require("../list/list.entity");
let BoardEntity = class BoardEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], BoardEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], BoardEntity.prototype, "created", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], BoardEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity, author => author.boards),
    typeorm_1.JoinTable(),
    __metadata("design:type", user_entity_1.UserEntity)
], BoardEntity.prototype, "author", void 0);
__decorate([
    typeorm_1.ManyToMany(type => user_entity_1.UserEntity, author => author.stars),
    __metadata("design:type", Array)
], BoardEntity.prototype, "stars", void 0);
__decorate([
    typeorm_1.OneToMany(type => list_entity_1.ListEntity, list => list.board, { cascade: true }),
    __metadata("design:type", Array)
], BoardEntity.prototype, "lists", void 0);
BoardEntity = __decorate([
    typeorm_1.Entity('board')
], BoardEntity);
exports.BoardEntity = BoardEntity;
//# sourceMappingURL=board.entity.js.map