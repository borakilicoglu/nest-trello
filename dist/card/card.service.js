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
exports.CardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const list_entity_1 = require("../list/list.entity");
const user_entity_1 = require("../user/user.entity");
const card_entity_1 = require("./card.entity");
let CardService = class CardService {
    constructor(cardRepository, listRepository, userRepository) {
        this.cardRepository = cardRepository;
        this.listRepository = listRepository;
        this.userRepository = userRepository;
    }
    toResponseObject(card) {
        return Object.assign(Object.assign({}, card), { author: card.author && card.author.toResponseObject() });
    }
    ensureOwnership(card, userId) {
        if (card.author.id !== userId) {
            throw new common_1.HttpException('Incorrect User', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    showByList(listId, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const cards = yield this.cardRepository.find({
                where: { list: { id: listId } },
                relations: ['author', 'list'],
                take: 25,
                skip: 25 * (page - 1),
            });
            return cards.map(card => this.toResponseObject(card));
        });
    }
    showByUser(userId, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const cards = yield this.cardRepository.find({
                where: { author: { id: userId } },
                relations: ['author', 'list'],
                take: 25,
                skip: 25 * (page - 1),
            });
            return cards.map(card => this.toResponseObject(card));
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const card = yield this.cardRepository.findOne({
                where: { id },
                relations: ['author', 'list'],
            });
            return this.toResponseObject(card);
        });
    }
    create(listId, userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.listRepository.findOne({ where: { id: listId } });
            const user = yield this.userRepository.findOne({ where: { id: userId } });
            const card = yield this.cardRepository.create(Object.assign(Object.assign({}, data), { list, author: user }));
            yield this.cardRepository.save(card);
            return this.toResponseObject(card);
        });
    }
    update(id, userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let card = yield this.cardRepository.findOne({
                where: { id },
                relations: ['author', 'list'],
            });
            if (!card) {
                throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
            }
            this.ensureOwnership(card, userId);
            yield this.cardRepository.update({ id }, data);
            card = yield this.cardRepository.findOne({
                where: { id },
                relations: ['author', 'list'],
            });
            return this.toResponseObject(card);
        });
    }
    destroy(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const card = yield this.cardRepository.findOne({
                where: { id },
                relations: ['author', 'list'],
            });
            if (card.author.id !== userId) {
                throw new common_1.HttpException('You do not own this card', common_1.HttpStatus.UNAUTHORIZED);
            }
            yield this.cardRepository.remove(card);
            return this.toResponseObject(card);
        });
    }
};
CardService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(card_entity_1.CardEntity)),
    __param(1, typeorm_1.InjectRepository(list_entity_1.ListEntity)),
    __param(2, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CardService);
exports.CardService = CardService;
//# sourceMappingURL=card.service.js.map