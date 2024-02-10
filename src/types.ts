
export type Row = {
    speaker: number;
    start: string;
    end: string;
    text: string;
};

export type RowExtended = Row & {
    startSeconds: number;
    endSeconds: number;
};