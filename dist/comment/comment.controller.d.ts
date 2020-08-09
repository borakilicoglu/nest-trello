import { Logger } from '@nestjs/common';
import { CommentDTO } from './comment.dto';
import { CommentService } from './comment.service';
export declare class CommentController {
    private commentService;
    logger: Logger;
    constructor(commentService: CommentService);
    showCommentsByCard(card: string, page: number): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        card: import("../card/card.entity").CardEntity;
    }[]>;
    createComment(card: string, user: string, data: CommentDTO): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        card: import("../card/card.entity").CardEntity;
    }>;
    showCommentsByUser(user: string, page: number): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        card: import("../card/card.entity").CardEntity;
    }[]>;
    showComment(id: string): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        card: import("../card/card.entity").CardEntity;
    }>;
    destroyComment(id: string, user: string): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        card: import("../card/card.entity").CardEntity;
    }>;
}
