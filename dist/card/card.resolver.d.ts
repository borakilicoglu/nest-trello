import { CardService } from './card.service';
export declare class CardResolver {
    private cardService;
    constructor(cardService: CardService);
    card(id: string): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        description: string;
        list: import("../list/list.entity").ListEntity;
    }>;
    createCard(listId: string, name: string, description: string, user: any): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        description: string;
        list: import("../list/list.entity").ListEntity;
    }>;
    deleteCard(id: string, user: any): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        description: string;
        list: import("../list/list.entity").ListEntity;
    }>;
}
