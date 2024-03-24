import { Exhibit } from "./exhibit.model";

export interface Order {
    _id?: string,
    vendor: string,
    catalog: string,
    creator: string,
    items: Exhibit[],
}