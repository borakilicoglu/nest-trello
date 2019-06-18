import { UserRO } from '../user/user.dto';
export declare class BoardDTO {
    readonly name: string;
}
export declare class BoardRO {
    id: string;
    created: Date;
    updated: Date;
    name: string;
    author: UserRO;
}
