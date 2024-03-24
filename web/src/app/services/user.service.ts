import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { NewUser, User } from '../models/user.model';



@Injectable({
    providedIn: 'root'
})
export class UserService implements OnInit {

    users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

    constructor (private httpClient: HttpClient) {}

    ngOnInit() {
        this.getUsers().subscribe({
            next: (response) => { this.users.next(response.users) },
            error: (error) => { console.error(error); }, 
            complete: () => {}
        });
    }

    getUsers() {
        return this.httpClient.get<{ users: User[] }>('http://localhost:8080/api/user');
    }

    getUser(userId: string) {
        return this.httpClient.get<User>('http://localhost:8080/api/user/' + userId);
    }

    getUserTokens(userId: string) {
        return this.httpClient.get<{ tokens: string[] }>('http://localhost:8080/api/user/' + userId + "/tokens");
    }

    createUser(user: NewUser) {
        return this.httpClient.post<NewUser>('http://localhost:8080/api/user', user);
    }

    updateUser(userId: string, user: NewUser) {
        return this.httpClient.put<NewUser>('http://localhost:8080/api/user/' + userId, user);
    }

    deleteUser(userId: string) {
        return this.httpClient.delete<User>('http://localhost:8080/api/user/' + userId);
    }
}