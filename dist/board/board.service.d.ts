import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BoardEntity } from './board.entity';
import { BoardDTO, BoardRO } from './board.dto';
import { AppGateway } from '../app.gateway';
export declare class BoardService {
    private boardRepository;
    private userRepository;
    private gateway;
    constructor(boardRepository: Repository<BoardEntity>, userRepository: Repository<UserEntity>, gateway: AppGateway);
    private boardToResponseObject;
    private ensureOwnership;
    showAll(page?: number, newest?: boolean): Promise<BoardRO[]>;
    read(id: string): Promise<BoardRO>;
    create(userId: string, data: BoardDTO): Promise<BoardRO>;
    update(id: string, userId: string, data: Partial<BoardDTO>): Promise<BoardRO>;
    destroy(id: string, userId: string): Promise<BoardRO>;
}
