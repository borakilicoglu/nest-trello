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
const user_entity_1 = require("../user/user.entity");
const board_entity_1 = require("./board.entity");
const app_gateway_1 = require("../app.gateway");
let BoardService = class BoardService {
    constructor(boardRepository, userRepository, gateway) {
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
        this.gateway = gateway;
    }
    boardToResponseObject(board) {
        const responseObject = Object.assign({}, board);
        return responseObject;
    }
    ensureOwnership(board, userId) {
        if (board.author.id !== userId) {
            throw new common_1.HttpException('Incorrect User', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    showAll(page = 1, newest) {
        return __awaiter(this, void 0, void 0, function* () {
            const boards = yield this.boardRepository.find({
                relations: ['author', 'lists'],
                take: 25,
                skip: 25 * (page - 1),
                order: newest && { created: 'DESC' },
            });
            return boards.map(board => this.boardToResponseObject(board));
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const board = yield this.boardRepository.findOne({
                where: { id },
                relations: ['author', 'lists'],
            });
            if (!board) {
                throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
            }
            return this.boardToResponseObject(board);
        });
    }
    create(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { id: userId } });
            const board = yield this.boardRepository.create(Object.assign({}, data, { author: user }));
            yield this.boardRepository.save(board);
            this.gateway.wss.emit('newBoard', board);
            return this.boardToResponseObject(board);
        });
    }
    update(id, userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let board = yield this.boardRepository.findOne({
                where: { id },
                relations: ['author', 'lists'],
            });
            if (!board) {
                throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
            }
            this.ensureOwnership(board, userId);
            yield this.boardRepository.update({ id }, data);
            board = yield this.boardRepository.findOne({
                where: { id },
                relations: ['author', 'lists'],
            });
            return this.boardToResponseObject(board);
        });
    }
    destroy(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const board = yield this.boardRepository.findOne({
                where: { id },
                relations: ['author'],
            });
            if (!board) {
                throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
            }
            this.ensureOwnership(board, userId);
            yield this.boardRepository.remove(board);
            return this.boardToResponseObject(board);
        });
    }
};
BoardService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(board_entity_1.BoardEntity)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        app_gateway_1.AppGateway])
], BoardService);
exports.BoardService = BoardService;
//# sourceMappingURL=board.service.js.map