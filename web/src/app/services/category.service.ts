import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService implements OnInit {

    categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

    constructor (private httpClient: HttpClient) {}

    ngOnInit() {
        this.getCategories().subscribe({
            next: (response) => { this.categories.next(response.categories) },
            error: (error) => { console.error(error); }, 
            complete: () => {}
        });
    }

    getCategories() {
        return this.httpClient.get<{ categories: Category[] }>('http://localhost:8080/api/category');
    }

    getCategoriesByVendor(vendor: string) {
        return this.httpClient.get<{ categories: Category[] }>('http://localhost:8080/api/category/' + vendor);
    }

    getCategoryById(categoryId: string) {
        return this.httpClient.get<Category>('http://localhost:8080/api/category/' + categoryId);
    }

    createCategory(category: Category) {
        return this.httpClient.post<Category>('http://localhost:8080/api/category', category);
    }

    updateCategory(categoryId: string, category: Category) {
        return this.httpClient.put<Category>('http://localhost:8080/api/category/' + categoryId, category);
    }

    deleteCategory(categoryId: string) {
        return this.httpClient.delete<Category>('http://localhost:8080/api/category/' + categoryId);
    }
}