import { Logger } from '@nestjs/common';
import { CommentDTO } from './comment.dto';
import { CommentService } from './comment.service';
export declare class CommentController {
    private commentService;
    logger: Logger;
    constructor(commentService: CommentService);
    showCommentsByIdea(idea: string, page: number): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        idea: import("../idea/idea.entity").IdeaEntity;
    }[]>;
    createComment(idea: string, user: string, data: CommentDTO): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        idea: import("../idea/idea.entity").IdeaEntity;
    }>;
    showCommentsByUser(user: string, page: number): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        idea: import("../idea/idea.entity").IdeaEntity;
    }[]>;
    showComment(id: string): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        idea: import("../idea/idea.entity").IdeaEntity;
    }>;
    destroyComment(id: string, user: string): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        comment: String;
        idea: import("../idea/idea.entity").IdeaEntity;
    }>;
}
