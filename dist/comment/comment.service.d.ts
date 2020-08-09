import { Repository } from 'typeorm';
import { CardEntity } from '../card/card.entity';
import { UserEntity } from '../user/user.entity';
import { CommentEntity } from './comment.entity';
import { CommentDTO } from './comment.dto';
export declare class CommentService {
    private commentRepository;
    private cardRepository;
    private userRepository;
    constructor(commentRepository: Repository<CommentEntity>, cardRepository: Repository<CardEntity>, userRepository: Repository<UserEntity>);
    private toResponseObject;
    showByCard(cardId: string, page?: number): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        card: CardEntity;
    }[]>;
    showByUser(userId: string, page?: number): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        card: CardEntity;
    }[]>;
    show(id: string): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        card: CardEntity;
    }>;
    create(cardId: string, userId: string, data: CommentDTO): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        card: CardEntity;
    }>;
    destroy(id: string, userId: string): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        card: CardEntity;
    }>;
}
