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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const list_entity_1 = require("./list.entity");
const user_entity_1 = require("../user/user.entity");
const board_entity_1 = require("../board/board.entity");
let ListService = class ListService {
    constructor(listRepository, boardRepository, userRepository) {
        this.listRepository = listRepository;
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
    }
    toResponseObject(list) {
        return Object.assign({}, list, { author: list.author && list.author.toResponseObject() });
    }
    ensureOwnership(list, userId) {
        if (list.author.id !== userId) {
            throw new common_1.HttpException('Incorrect User', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    showByBoard(boardId, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const lists = yield this.listRepository.find({
                where: { board: { id: boardId } },
                relations: ['author', 'board', 'cards'],
                take: 25,
                skip: 25 * (page - 1),
            });
            return lists.map(list => this.toResponseObject(list));
        });
    }
    showByUser(userId, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const lists = yield this.listRepository.find({
                where: { author: { id: userId } },
                relations: ['author', 'board'],
                take: 25,
                skip: 25 * (page - 1),
            });
            return lists.map(list => this.toResponseObject(list));
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.listRepository.findOne({
                where: { id },
                relations: ['author', 'board', 'cards'],
            });
            return this.toResponseObject(list);
        });
    }
    create(boardId, userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const board = yield this.boardRepository.findOne({ where: { id: boardId } });
            const user = yield this.userRepository.findOne({ where: { id: userId } });
            const list = yield this.listRepository.create(Object.assign({}, data, { board, author: user }));
            yield this.listRepository.save(list);
            return this.toResponseObject(list);
        });
    }
    update(id, userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let list = yield this.listRepository.findOne({
                where: { id },
                relations: ['author', 'board'],
            });
            if (!list) {
                throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
            }
            this.ensureOwnership(list, userId);
            yield this.listRepository.update({ id }, data);
            list = yield this.listRepository.findOne({
                where: { id },
                relations: ['author', 'board'],
            });
            return this.toResponseObject(list);
        });
    }
    destroy(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.listRepository.findOne({
                where: { id },
                relations: ['author'],
            });
            if (!list) {
                throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
            }
            if (list.author.id !== userId) {
                throw new common_1.HttpException('You do not own this list', common_1.HttpStatus.UNAUTHORIZED);
            }
            yield this.listRepository.remove(list);
            return this.toResponseObject(list);
        });
    }
};
ListService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(list_entity_1.ListEntity)),
    __param(1, typeorm_1.InjectRepository(board_entity_1.BoardEntity)),
    __param(2, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ListService);
exports.ListService = ListService;
//# sourceMappingURL=list.service.js.map