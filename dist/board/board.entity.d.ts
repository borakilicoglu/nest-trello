import { UserEntity } from '../user/user.entity';
import { ListEntity } from '../list/list.entity';
export declare class BoardEntity {
    id: string;
    created: Date;
    name: String;
    author: UserEntity;
    stars: UserEntity[];
    lists: ListEntity[];
}
