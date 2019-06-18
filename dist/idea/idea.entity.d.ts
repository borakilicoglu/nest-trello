import { UserEntity } from '../user/user.entity';
import { CommentEntity } from '../comment/comment.entity';
export declare class IdeaEntity {
    id: string;
    created: Date;
    updated: Date;
    idea: string;
    description: string;
    author: UserEntity;
    upvotes: UserEntity[];
    downvotes: UserEntity[];
    comments: CommentEntity[];
}
