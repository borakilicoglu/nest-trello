import { BoardService } from './board.service';
import { BoardDTO } from './board.dto';
export declare class BoardController {
    private boardService;
    private logger;
    constructor(boardService: BoardService);
    private logData;
    showAllIBoards(page: number): Promise<import("./board.dto").BoardRO[]>;
    showNewestBoards(page: number): Promise<import("./board.dto").BoardRO[]>;
    createBoard(user: any, body: BoardDTO): Promise<import("./board.dto").BoardRO>;
    readBoard(id: string): Promise<import("./board.dto").BoardRO>;
    updateBoard(id: string, user: any, body: Partial<BoardDTO>): Promise<import("./board.dto").BoardRO>;
    destroyBoard(id: string, user: any): Promise<import("./board.dto").BoardRO>;
}
