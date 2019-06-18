export declare class DateScalar {
    description: string;
    parseValue(value: any): Date;
    serialize(value: Date): string;
    parseLiteral(ast: any): number;
}
