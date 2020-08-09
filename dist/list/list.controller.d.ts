import { Logger } from '@nestjs/common';
import { ListDTO } from './list.dto';
import { ListService } from './list.service';
export declare class ListController {
    private listService;
    logger: Logger;
    constructor(listService: ListService);
    showListByBoard(board: string, page: number): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        board: import("../board/board.entity").BoardEntity;
        cards: import("../card/card.entity").CardEntity[];
    }[]>;
    createList(board: string, user: string, data: ListDTO): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        board: import("../board/board.entity").BoardEntity;
        cards: import("../card/card.entity").CardEntity[];
    }>;
    showListsByUser(user: string, page: number): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        board: import("../board/board.entity").BoardEntity;
        cards: import("../card/card.entity").CardEntity[];
    }[]>;
    showList(id: string): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        board: import("../board/board.entity").BoardEntity;
        cards: import("../card/card.entity").CardEntity[];
    }>;
    updateCard(id: string, user: any, data: ListDTO): Promise<ListDTO>;
    destroyList(id: string, user: string): Promise<{
        author: import("../user/user.dto").UserRO;
        id: string;
        created: Date;
        name: string;
        board: import("../board/board.entity").BoardEntity;
        cards: import("../card/card.entity").CardEntity[];
    }>;
}
