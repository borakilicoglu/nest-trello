import { CommentService } from '../comment/comment.service';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';
export declare class IdeaResolver {
    private ideaService;
    private commentService;
    constructor(ideaService: IdeaService, commentService: CommentService);
    ideas(page: number, newest: boolean): Promise<import("./idea.dto").IdeaRO[]>;
    idea(id: string): Promise<import("./idea.dto").IdeaRO>;
    createIdea(id: string, { idea, description }: IdeaDTO, user: any): Promise<import("./idea.dto").IdeaRO>;
    updateIdea(id: string, { idea, description }: IdeaDTO, user: any): Promise<import("./idea.dto").IdeaRO>;
    deleteIdea(id: string, user: any): Promise<import("./idea.dto").IdeaRO>;
    upvote(id: string, user: any): Promise<import("./idea.dto").IdeaRO>;
    downvote(id: string, user: any): Promise<import("./idea.dto").IdeaRO>;
    bookmark(id: string, user: any): Promise<import("../user/user.dto").UserRO>;
    unbookmark(id: string, user: any): Promise<import("../user/user.dto").UserRO>;
    comments(idea: any): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        idea: import("./idea.entity").IdeaEntity;
    }[]>;
}
