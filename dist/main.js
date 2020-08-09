"use strict";
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
require("dotenv/config");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const port = process.env.PORT || 3000;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const options = new swagger_1.DocumentBuilder()
            .setTitle('Nest Trello Api')
            .setDescription('The nest trello API description')
            .setVersion('1.0')
            .addTag('Nest Trello')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup('api', app, document);
        app.enableCors({
            origin: [
                'https://borakilicoglu.github.io',
                'http://localhost:4200',
                'http://localhost:3000',
                'http://localhost:8081',
            ],
            credentials: true
        });
        yield app.listen(port);
        common_1.Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map