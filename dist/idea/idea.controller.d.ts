import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';
export declare class IdeaController {
    private ideaService;
    private logger;
    constructor(ideaService: IdeaService);
    private logData;
    showAllIdeas(page: number): Promise<import("./idea.dto").IdeaRO[]>;
    showNewestIdeas(page: number): Promise<import("./idea.dto").IdeaRO[]>;
    createIdea(user: any, body: IdeaDTO): Promise<import("./idea.dto").IdeaRO>;
    readIdea(id: string): Promise<import("./idea.dto").IdeaRO>;
    updateIdea(id: string, user: any, body: Partial<IdeaDTO>): Promise<import("./idea.dto").IdeaRO>;
    destroyIdea(id: string, user: any): Promise<import("./idea.dto").IdeaRO>;
    upvoteIdea(id: string, user: string): Promise<import("./idea.dto").IdeaRO>;
    downvoteIdea(id: string, user: string): Promise<import("./idea.dto").IdeaRO>;
    bookmarkIdea(id: string, user: string): Promise<import("../user/user.dto").UserRO>;
    unbookmarkIdea(id: string, user: string): Promise<import("../user/user.dto").UserRO>;
}
