import { Repository } from 'typeorm';
import { ListEntity } from '../list/list.entity';
import { UserEntity } from '../user/user.entity';
import { CardEntity } from './card.entity';
import { CardDTO } from './card.dto';
export declare class CardService {
    private cardRepository;
    private listRepository;
    private userRepository;
    constructor(cardRepository: Repository<CardEntity>, listRepository: Repository<ListEntity>, userRepository: Repository<UserEntity>);
    private toResponseObject;
    private ensureOwnership;
    showByList(listId: string, page?: number): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        description: string;
        list: ListEntity;
    }[]>;
    showByUser(userId: string, page?: number): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        description: string;
        list: ListEntity;
    }[]>;
    show(id: string): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        description: string;
        list: ListEntity;
    }>;
    create(listId: string, userId: string, data: CardDTO): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        description: string;
        list: ListEntity;
    }>;
    update(id: string, userId: string, data: Partial<CardDTO>): Promise<CardDTO>;
    destroy(id: string, userId: string): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        description: string;
        list: ListEntity;
    }>;
}
