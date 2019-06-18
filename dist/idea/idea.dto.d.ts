import { UserRO } from '../user/user.dto';
export declare class IdeaDTO {
    readonly idea: string;
    readonly description: string;
}
export declare class IdeaRO {
    id: string;
    created: Date;
    updated: Date;
    idea: string;
    description: string;
    author: UserRO;
    upvotes?: number;
    downvotes?: number;
}
