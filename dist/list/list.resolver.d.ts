import { ListService } from './list.service';
export declare class ListResolver {
    private listService;
    constructor(listService: ListService);
    lists(boardId: string, page: number): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        board: import("../board/board.entity").BoardEntity;
        cards: import("../card/card.entity").CardEntity[];
    }[]>;
    list(id: string): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        board: import("../board/board.entity").BoardEntity;
        cards: import("../card/card.entity").CardEntity[];
    }>;
    createList(boardId: string, name: string, user: any): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        board: import("../board/board.entity").BoardEntity;
        cards: import("../card/card.entity").CardEntity[];
    }>;
    deleteList(id: string, user: any): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        board: import("../board/board.entity").BoardEntity;
        cards: import("../card/card.entity").CardEntity[];
    }>;
}
