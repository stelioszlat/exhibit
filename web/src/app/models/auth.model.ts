export interface LoginBody {
    username: string,
    password: string
}

export interface AuthResponse {
    access_token: string,
    userId: string
    isAdmin: boolean,
    isSuperAdmin: boolean,
    vendor: string,
}

export interface RegisterBody {
    email: string,
    username: string,
    password: string,
    rePassword: string
}