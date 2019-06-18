import { UserEntity } from '../user/user.entity';
import { IdeaEntity } from '../idea/idea.entity';
export declare class CommentEntity {
    id: string;
    created: Date;
    comment: String;
    author: UserEntity;
    idea: IdeaEntity;
}
