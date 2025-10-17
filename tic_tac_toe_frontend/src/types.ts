export type Player = 'X' | 'O';
export type Cell = Player | null;
export type BoardState = Cell[];

export type GameMode = 'pvp' | 'cpu';
