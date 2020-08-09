import { BoardEntity } from '../board/board.entity';
export declare class UserDTO {
    username: string;
    email: string;
    password: string;
    passwordNew?: string;
}
export declare class UserRO {
    id: string;
    username: string;
    email?: string;
    role: string;
    created: Date;
    token?: string;
    password?: string;
    boards?: BoardEntity[];
    stars?: BoardEntity[];
}
