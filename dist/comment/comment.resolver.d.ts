import { CommentService } from './comment.service';
export declare class CommentResolver {
    private commentService;
    constructor(commentService: CommentService);
    comment(id: string): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        card: import("../card/card.entity").CardEntity;
    }>;
    createComment(cardId: string, comment: string, user: any): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        card: import("../card/card.entity").CardEntity;
    }>;
    deleteComment(id: string, user: any): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        card: import("../card/card.entity").CardEntity;
    }>;
}
