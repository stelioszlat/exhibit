import { Category } from "./category.model";

export interface Catalog {
    _id?: string,
    name: string,
    vendor: string,
    version?: string,
    categories: Category[] 
}