import { UserEntity } from '../user/user.entity';
import { ListEntity } from '../list/list.entity';
export declare class CardEntity {
    id: string;
    created: Date;
    name: string;
    description: string;
    author: UserEntity;
    list: ListEntity;
}
