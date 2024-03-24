import { Exhibit } from "./exhibit.model";

export interface Item extends Exhibit{
    orderQuantity: number;
}