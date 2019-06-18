import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { IdeaEntity } from './idea.entity';
import { IdeaDTO, IdeaRO } from './idea.dto';
import { AppGateway } from '../app.gateway';
export declare class IdeaService {
    private ideaRepository;
    private userRepository;
    private gateway;
    constructor(ideaRepository: Repository<IdeaEntity>, userRepository: Repository<UserEntity>, gateway: AppGateway);
    private ideaToResponseObject;
    private ensureOwnership;
    private vote;
    showAll(page?: number, newest?: boolean): Promise<IdeaRO[]>;
    read(id: string): Promise<IdeaRO>;
    create(userId: string, data: IdeaDTO): Promise<IdeaRO>;
    update(id: string, userId: string, data: Partial<IdeaDTO>): Promise<IdeaRO>;
    destroy(id: string, userId: string): Promise<IdeaRO>;
    upvote(id: string, userId: string): Promise<IdeaRO>;
    downvote(id: string, userId: string): Promise<IdeaRO>;
    bookmark(id: string, userId: string): Promise<import("../user/user.dto").UserRO>;
    unbookmark(id: string, userId: string): Promise<import("../user/user.dto").UserRO>;
}
