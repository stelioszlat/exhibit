import { Catalog } from "./catalog.model";

export interface Vendor {
    _id?: string,
    name: string,
    street: {type: String},
    zip: {type: Number},
    city: {type: String},
    country: {type: String},
    phones: string[],
    catalogs: Catalog[],
    openHour: number,
    closeHour: number,
    daysOpen: string[]
}