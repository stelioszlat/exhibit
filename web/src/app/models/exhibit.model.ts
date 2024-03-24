
export interface Exhibit {
    _id?: string, 
    name: string,
    displayName: string,
    description: string,
    image: string,
    sound: string,
    arrived: Date,
    creator: string,
    value: number,
    quantity: number,
    location: string
}