import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthResponse, LoginBody, RegisterBody } from "../models/auth.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private user: string = 'super-user';
    token: string = '';
    userId: string = '';
    isAdmin: boolean = false;
    isSuperAdmin: boolean = false;
    vendor: string = '';

    constructor(private router: Router, private httpClient: HttpClient) {}

    getCurrentUser(): string {
        return this.user;
    }

    login(loginBody: LoginBody) {
        this.httpClient.post<AuthResponse>('http://localhost:8080/api/auth/login', loginBody).subscribe({
            next: (response) => {
                this.token = response.access_token;
                localStorage.setItem('token', this.token);
                this.userId = response.userId;
                this.isAdmin = response.isAdmin;
                this.isSuperAdmin = response.isSuperAdmin;
                this.vendor = response.vendor;
            }, 
            error: (error) => {
                return error;
            },
            complete: () => {
                if (this.isAdmin) {
                    this.router.navigate(['admin']);
                } else {
                    this.router.navigate(['']);
                }
            }
        });
    }

    logout() {
        this.token = '';
        localStorage.removeItem('token');
    }

    register(registerBody: RegisterBody) {
        this.httpClient.post<AuthResponse>('http://localhost:8080/api/auth/register', registerBody).subscribe({
            next: (response) => {
                this.token = response.access_token;
                this.userId = response.userId;
            },
            error: (error) => {
                return error.message;
            },
            complete: () => {
                this.router.navigate(['']);
            }
        });
    }
}