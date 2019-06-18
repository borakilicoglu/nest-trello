import { IdeaEntity } from '../idea/idea.entity';
import { BoardEntity } from '../board/board.entity';
export declare class UserDTO {
    username: string;
    password: string;
}
export declare class UserRO {
    id: string;
    username: string;
    created: Date;
    token?: string;
    ideas?: IdeaEntity[];
    boards?: BoardEntity[];
    bookmarks?: IdeaEntity[];
}
