import { BoardService } from './board.service';
import { BoardDTO } from './board.dto';
export declare class BoardResolver {
    private boardService;
    constructor(boardService: BoardService);
    boards(page: number, newest: boolean): Promise<import("./board.dto").BoardRO[]>;
    board(id: string): Promise<import("./board.dto").BoardRO>;
    createBoard(id: string, { name }: BoardDTO, user: any): Promise<import("./board.dto").BoardRO>;
    updateBoard(id: string, { name }: BoardDTO, user: any): Promise<import("./board.dto").BoardRO>;
    deleteBoard(id: string, user: any): Promise<import("./board.dto").BoardRO>;
}
