
export interface Entry{
    _id: string;
    description: string;
    createdAt: number;
    status: EntryStatus; //el status es del tipo de abajo para que el status solo maneje estas 3 opciones
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished';