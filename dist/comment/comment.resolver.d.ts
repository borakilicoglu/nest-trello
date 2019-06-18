import { CommentService } from './comment.service';
export declare class CommentResolver {
    private commentService;
    constructor(commentService: CommentService);
    comment(id: string): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        idea: import("../idea/idea.entity").IdeaEntity;
    }>;
    createComment(ideaId: string, comment: string, user: any): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        idea: import("../idea/idea.entity").IdeaEntity;
    }>;
    deleteComment(id: string, user: any): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        idea: import("../idea/idea.entity").IdeaEntity;
    }>;
}
