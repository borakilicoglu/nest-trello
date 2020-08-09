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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nest-modules/mailer");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    constructor(userRepository, mailerService) {
        this.userRepository = userRepository;
        this.mailerService = mailerService;
        this.logger = new common_1.Logger('UserService');
    }
    mail(user) {
        const date = Date.now();
        const link = `http://localhost:4200/auth/reset/${user.id}` + `-` + date;
        this
            .mailerService
            .sendMail({
            to: user.email,
            from: '"Angular Trello" <noreply@angulartrello.com>',
            subject: 'Reset your password ✔',
            text: 'Someone (hopefully you) has requested a password reset for your Heroku account. Follow the link below to set a new password:',
            template: 'reset',
            context: {
                username: user.username,
                email: user.email,
                link: link
            },
        })
            .then(() => { })
            .catch(() => { });
    }
    showAll(page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.find({
                relations: ['boards', 'stars'],
                take: 25,
                skip: 25 * (page - 1),
            });
            return users.map(user => user.toResponseObject(false));
        });
    }
    read(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { username },
                relations: ['boards', 'stars'],
            });
            return user.toResponseObject(false);
        });
    }
    edit(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
            }
            let { email, username } = data;
            let a = yield this.userRepository.findOne({ where: { email } });
            if (a && a.id !== id) {
                throw new common_1.HttpException('This email address is already in use', common_1.HttpStatus.NOT_FOUND);
            }
            let b = yield this.userRepository.findOne({ where: { username } });
            if (b && b.id !== id) {
                throw new common_1.HttpException('This username is already in use', common_1.HttpStatus.NOT_FOUND);
            }
            yield this.userRepository.update({ id }, data);
            return user.toResponseObject();
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = data;
            const user = yield this.userRepository.findOne({ where: { username } });
            if (!user || !(yield user.comparePassword(password))) {
                throw new common_1.HttpException('Invalid username/password', common_1.HttpStatus.BAD_REQUEST);
            }
            return user.toResponseObject();
        });
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = data;
            let user = yield this.userRepository.findOne({ where: { username } });
            if (user) {
                throw new common_1.HttpException('User already exists', common_1.HttpStatus.BAD_REQUEST);
            }
            user = yield this.userRepository.create(data);
            yield this.userRepository.save(user);
            return user.toResponseObject();
        });
    }
    forgot(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { email } });
            if (!user) {
                throw new common_1.HttpException('Invalid username/password', common_1.HttpStatus.BAD_REQUEST);
            }
            this.mail(user.toResponseObject(false));
        });
    }
    updatePassword(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, passwordNew } = data;
            this.logger.log(data);
            const user = yield this.userRepository.findOne({ where: { id } });
            if (!user || !(yield user.comparePassword(password))) {
                throw new common_1.HttpException('Invalid password', common_1.HttpStatus.BAD_REQUEST);
            }
            let newPassword = yield bcrypt.hash(passwordNew, 10);
            yield this.userRepository.update({ id }, { password: newPassword });
        });
    }
    resetPassword(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new common_1.HttpException('Invalid username/password', common_1.HttpStatus.BAD_REQUEST);
            }
            const diff = yield this.diff_hours(data.id.substr(data.id.lastIndexOf('-') + 1));
            if (diff > 2) {
                throw new common_1.HttpException('Invalid Token', common_1.HttpStatus.BAD_REQUEST);
            }
            let password = yield bcrypt.hash(data.password, 10);
            yield this.userRepository.update({ id }, { password: password });
            return user.toResponseObject();
        });
    }
    diff_hours(date) {
        return __awaiter(this, void 0, void 0, function* () {
            let diff = (date - Date.now()) / 1000;
            diff /= (60 * 60);
            return Math.abs(Math.round(diff));
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailer_1.MailerService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map