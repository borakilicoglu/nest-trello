import { CommentService } from '../comment/comment.service';
import { UserService } from './user.service';
export declare class UserResolver {
    private userService;
    private commentService;
    constructor(userService: UserService, commentService: CommentService);
    users(page: number): Promise<import("./user.dto").UserRO[]>;
    user(username: string): Promise<import("./user.dto").UserRO>;
    whoami(user: any): Promise<import("./user.dto").UserRO>;
    login(username: string, password: string): Promise<import("./user.dto").UserRO>;
    register(username: string, password: string): Promise<import("./user.dto").UserRO>;
    comments(user: any): Promise<{
        author: import("./user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        idea: import("../idea/idea.entity").IdeaEntity;
    }[]>;
}
