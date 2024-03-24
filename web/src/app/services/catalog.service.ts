import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Catalog } from '../models/catalog.model';

@Injectable({
    providedIn: 'root'
})
export class CatalogService implements OnInit {

    catalogs: BehaviorSubject<Catalog[]> = new BehaviorSubject<Catalog[]>([]);
    token: string = '';

    constructor (private httpClient: HttpClient, private route: ActivatedRoute) {}

    ngOnInit() {
        this.getCatalogs().subscribe({
            next: (response) => { this.catalogs.next(response.catalogs) },
            error: (error) => { console.error(error); }, 
            complete: () => {}
        });
        this.route.queryParams.subscribe(params => {
            this.token = params['token'];
        })
    }

    getCatalogs() {
        return this.httpClient.get<{ catalogs: Catalog[] }>('http://localhost:8080/api/catalog');
    }

    getCatalogsByVendor(vendorId: string) {
        return this.httpClient.get<{ catalogs: Catalog[] }>('http://localhost:8080/api/catalog/vendor/' + vendorId);
    }

    getCatalogById(catalogId: string) {
        return this.httpClient.get<{ catalog: Catalog }>('http://localhost:8080/api/catalog/' + catalogId, {
            "params": {
                "token": this.token
            }
        });
    }

    createCatalog(catalog: Catalog) {
        return this.httpClient.post<Catalog>('http://localhost:8080/api/catalog', catalog);
    }

    updateCatalogById(catalogId: string, catalog: Catalog) {
        return this.httpClient.put<Catalog>('http://localhost:8080/api/catalog/' + catalogId, catalog);
    }
}