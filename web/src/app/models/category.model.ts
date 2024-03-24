import { Exhibit } from "./exhibit.model";

export interface Category {
    _id?: string,
    name: string,
    displayName: string,
    description: string,
    exhibits: Exhibit[]
}