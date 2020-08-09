import { Logger } from '@nestjs/common';
import { CardDTO } from './card.dto';
import { CardService } from './card.service';
export declare class CardController {
    private cardService;
    logger: Logger;
    constructor(cardService: CardService);
    showCardsByList(list: string, page: number): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        description: string;
        list: import("../list/list.entity").ListEntity;
        comments: import("../comment/comment.entity").CommentEntity[];
    }[]>;
    createCard(list: string, user: string, data: CardDTO): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        description: string;
        list: import("../list/list.entity").ListEntity;
        comments: import("../comment/comment.entity").CommentEntity[];
    }>;
    updateCard(id: string, user: any, data: CardDTO): Promise<CardDTO>;
    showCard(id: string): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        description: string;
        list: import("../list/list.entity").ListEntity;
        comments: import("../comment/comment.entity").CommentEntity[];
    }>;
    destroyCard(id: string, user: string): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        description: string;
        list: import("../list/list.entity").ListEntity;
        comments: import("../comment/comment.entity").CommentEntity[];
    }>;
}
