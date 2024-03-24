export interface User {
    _id?: string,
    username: string,
    email: string,
    password: string,
    isAdmin: boolean,
    isSuperAdmin: boolean,
    lastLogin?: Date,
    apiToken?: string,
    createdAt?: Date
}

export interface NewUser extends User {
    rePassword: string
}