import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

@WebSocketGateway(process.env.PORT == "3000" ? 4001 : null, { transport: ['polling', 'websocket'] })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  wss: any;

  private logger = new Logger('AppGateway');

  handleConnection(client) {
    this.logger.log('New client connected');
    client.emit('connection', 'Successfully connected to server');
  }

  handleDisconnect(client) {
    this.logger.log('Client disconnected');
  }
}
