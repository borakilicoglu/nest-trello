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
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
let AppGateway = class AppGateway {
    constructor() {
        this.logger = new common_1.Logger('AppGateway');
    }
    handleConnection(client) {
        this.logger.log('New client connected');
        client.emit('connection', 'Successfully connected to server');
    }
    handleDisconnect(client) {
        this.logger.log('Client disconnected');
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], AppGateway.prototype, "wss", void 0);
AppGateway = __decorate([
    websockets_1.WebSocketGateway(4001, { transport: ['websocket'] })
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map