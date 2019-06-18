import { Repository } from 'typeorm';
import { ListEntity } from './list.entity';
import { UserEntity } from '../user/user.entity';
import { BoardEntity } from '../board/board.entity';
import { ListDTO } from './list.dto';
export declare class ListService {
    private listRepository;
    private boardRepository;
    private userRepository;
    constructor(listRepository: Repository<ListEntity>, boardRepository: Repository<BoardEntity>, userRepository: Repository<UserEntity>);
    private toResponseObject;
    private ensureOwnership;
    showByBoard(boardId: string, page?: number): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        board: BoardEntity;
        cards: import("../card/card.entity").CardEntity[];
    }[]>;
    showByUser(userId: string, page?: number): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        board: BoardEntity;
        cards: import("../card/card.entity").CardEntity[];
    }[]>;
    show(id: string): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        board: BoardEntity;
        cards: import("../card/card.entity").CardEntity[];
    }>;
    create(boardId: string, userId: string, data: ListDTO): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        board: BoardEntity;
        cards: import("../card/card.entity").CardEntity[];
    }>;
    update(id: string, userId: string, data: Partial<ListDTO>): Promise<ListDTO>;
    destroy(id: string, userId: string): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        board: BoardEntity;
        cards: import("../card/card.entity").CardEntity[];
    }>;
}
