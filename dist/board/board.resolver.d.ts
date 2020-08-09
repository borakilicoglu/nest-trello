import { BoardService } from './board.service';
import { BoardDTO } from './board.dto';
export declare class BoardResolver {
    private boardService;
    constructor(boardService: BoardService);
    boards(page: number, user: any, newest: boolean): Promise<import("./board.dto").BoardRO[]>;
    board(id: string, user: any): Promise<import("./board.dto").BoardRO>;
    createBoard(id: string, { name }: BoardDTO, user: any): Promise<import("./board.dto").BoardRO>;
    updateBoard(id: string, { name }: BoardDTO, user: any): Promise<import("./board.dto").BoardRO>;
    deleteBoard(id: string, user: any): Promise<import("./board.dto").BoardRO>;
    addStar(id: string, user: any): Promise<import("./board.dto").BoardRO>;
    removeStar(id: string, user: any): Promise<import("./board.dto").BoardRO>;
}
