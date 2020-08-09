import { BoardEntity } from '../board/board.entity';
import { UserRO } from './user.dto';
export declare class UserEntity {
    id: string;
    created: Date;
    email: string;
    username: string;
    password: string;
    role: string;
    boards: BoardEntity[];
    stars: BoardEntity[];
    hashPassword(): Promise<void>;
    comparePassword(attempt: string): Promise<boolean>;
    toResponseObject(showToken?: boolean): UserRO;
    private get token();
}
