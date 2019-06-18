import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDTO } from './user.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    showAll(page?: number): Promise<import("./user.dto").UserRO[]>;
    read(username: string): Promise<import("./user.dto").UserRO>;
    login(data: UserDTO): Promise<import("./user.dto").UserRO>;
    register(data: UserDTO): Promise<import("./user.dto").UserRO>;
}
