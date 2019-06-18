import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
export declare class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    wss: any;
    private logger;
    handleConnection(client: any): void;
    handleDisconnect(client: any): void;
}
