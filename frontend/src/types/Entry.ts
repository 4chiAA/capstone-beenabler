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
    egg: boolean,
    brood: boolean,
    queenCells: boolean,
}