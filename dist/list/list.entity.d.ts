import { BoardEntity } from '../board/board.entity';
import { UserEntity } from '../user/user.entity';
import { CardEntity } from '../card/card.entity';
export declare class ListEntity {
    id: string;
    created: Date;
    name: string;
    author: UserEntity;
    board: BoardEntity;
    cards: CardEntity[];
}
