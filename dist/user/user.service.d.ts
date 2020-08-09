import { MailerService } from '@nest-modules/mailer';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDTO } from './user.dto';
import { UserRO } from './user.dto';
export declare class UserService {
    private userRepository;
    private readonly mailerService;
    private logger;
    constructor(userRepository: Repository<UserEntity>, mailerService: MailerService);
    mail(user: any): void;
    showAll(page?: number): Promise<UserRO[]>;
    read(username: string): Promise<UserRO>;
    edit(id: string, data: Partial<UserDTO>): Promise<UserRO>;
    login(data: UserDTO): Promise<UserRO>;
    register(data: UserDTO): Promise<UserRO>;
    forgot(email: string): Promise<void>;
    updatePassword(id: string, data: UserDTO): Promise<void>;
    resetPassword(id: string, data: any): Promise<UserRO>;
    diff_hours(date: any): Promise<number>;
}
