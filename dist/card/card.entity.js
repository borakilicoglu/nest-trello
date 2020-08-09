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
exports.CardEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const list_entity_1 = require("../list/list.entity");
const comment_entity_1 = require("../comment/comment.entity");
let CardEntity = class CardEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], CardEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], CardEntity.prototype, "created", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], CardEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], CardEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity),
    typeorm_1.JoinTable(),
    __metadata("design:type", user_entity_1.UserEntity)
], CardEntity.prototype, "author", void 0);
__decorate([
    typeorm_1.ManyToOne(type => list_entity_1.ListEntity, list => list.cards, { onDelete: 'CASCADE' }),
    __metadata("design:type", list_entity_1.ListEntity)
], CardEntity.prototype, "list", void 0);
__decorate([
    typeorm_1.OneToMany(type => comment_entity_1.CommentEntity, comment => comment.card, { cascade: true }),
    __metadata("design:type", Array)
], CardEntity.prototype, "comments", void 0);
CardEntity = __decorate([
    typeorm_1.Entity('card')
], CardEntity);
exports.CardEntity = CardEntity;
//# sourceMappingURL=card.entity.js.map