export type Entry = {
    id?: string,
    beehiveId?: string,
    dateTime?: string,
    title: string,
    weight: number,
    feeding: number,
    honeyHarvest: number,
    varroaTreatment: boolean,
    queen: boolean,
    eggs: boolean,
    brood: boolean,
    queenCells: boolean,
}