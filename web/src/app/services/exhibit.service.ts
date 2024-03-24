import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { Exhibit } from '../models/exhibit.model';

interface ExhibitResponse {
    exhibits: Exhibit[],
    hasNextPage: boolean,
    lastPage: 1
}

@Injectable({
    providedIn: 'root'
})
export class ExhibitService implements OnInit {
    private BASE_PATH = '/api/exhibit/'; 

    exhibits: BehaviorSubject<Exhibit[]> = new BehaviorSubject<Exhibit[]>([]);

    constructor (private httpClient: HttpClient, private authService: AuthService) {}

    ngOnInit() {
        this.getExhibits().subscribe({
            next: (response) => { this.exhibits.next(response.exhibits) },
            error: (error) => { console.error(error); }, 
            complete: () => {}
        });
    }

    getExhibits() {
        return this.httpClient.get<ExhibitResponse>('http://localhost:8080/api/exhibit');
    }

    getExhibit(exhibitId: string) {
        return this.httpClient.get<Exhibit>('http://localhost:8080' + this.BASE_PATH + exhibitId);
    }

    getExhibitsByVendor() {
        return this.httpClient.get<{ exhibits: string[]}>('http://localhost:8080/api/exhibit/vendor/' + this.authService.vendor);
    }

    createExhibit(formData: FormData) {
        return this.httpClient.post<Exhibit>('http://localhost:8080' + this.BASE_PATH, formData, {
            headers: {
                'Authorization': 'Bearer ' + this.authService.token
            }
        });
    }

    updateExhibit(exhibitId: string, exhibit: Exhibit) {
        return this.httpClient.put<Exhibit>('http://localhost:8080' + this.BASE_PATH + exhibitId, exhibit);
    }

    deleteExhibit(exhibitId: string) {
        return this.httpClient.delete<Exhibit>('http://localhost:8080' + this.BASE_PATH + exhibitId);
    }
}

export { Exhibit };
