import { Repository } from 'typeorm';
import { IdeaEntity } from '../idea/idea.entity';
import { UserEntity } from '../user/user.entity';
import { CommentEntity } from './comment.entity';
import { CommentDTO } from './comment.dto';
export declare class CommentService {
    private commentRepository;
    private ideaRepository;
    private userRepository;
    constructor(commentRepository: Repository<CommentEntity>, ideaRepository: Repository<IdeaEntity>, userRepository: Repository<UserEntity>);
    private toResponseObject;
    showByIdea(ideaId: string, page?: number): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        idea: IdeaEntity;
    }[]>;
    showByUser(userId: string, page?: number): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        idea: IdeaEntity;
    }[]>;
    show(id: string): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        idea: IdeaEntity;
    }>;
    create(ideaId: string, userId: string, data: CommentDTO): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        idea: IdeaEntity;
    }>;
    destroy(id: string, userId: string): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        idea: IdeaEntity;
    }>;
}
