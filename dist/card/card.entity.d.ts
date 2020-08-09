import { UserEntity } from '../user/user.entity';
import { ListEntity } from '../list/list.entity';
import { CommentEntity } from '../comment/comment.entity';
export declare class CardEntity {
    id: string;
    created: Date;
    name: string;
    description: string;
    author: UserEntity;
    list: ListEntity;
    comments: CommentEntity[];
}
