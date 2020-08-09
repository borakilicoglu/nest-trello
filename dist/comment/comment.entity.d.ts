import { UserEntity } from '../user/user.entity';
import { CardEntity } from '../card/card.entity';
export declare class CommentEntity {
    id: string;
    created: Date;
    comment: String;
    author: UserEntity;
    card: CardEntity;
}
