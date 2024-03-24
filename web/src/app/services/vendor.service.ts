import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Vendor } from '../models/vendor.model';

@Injectable({
    providedIn: 'root'
})
export class VendorService implements OnInit {

    vendors: BehaviorSubject<Vendor[]> = new BehaviorSubject<Vendor[]>([]);

    constructor (private httpClient: HttpClient) {}

    ngOnInit() {
        this.getVendors().subscribe({
            next: (response) => { this.vendors.next(response.vendors) },
            error: (error) => { console.error(error); }, 
            complete: () => {}
        });
    }

    getVendors() {
        return this.httpClient.get<{ vendors: Vendor[] }>('http://localhost:8080/api/vendor');
    }

    searchVendor(vendor: string) {
        return this.httpClient.get<{ vendors: Vendor[] }>('http://localhost:8080/api/vendor/search?query=' + vendor);
    }

    createVendor(vendor: Vendor) {
        return this.httpClient.post<Vendor>('http://localhost:8080/api/vendor', vendor);
    }

    getVendor(vendorId: string) {
        return this.httpClient.get<Vendor>('http://localhost:8080/api/vendor' + vendorId);
    }

    updateVendor(vendorId: string, vendor: Vendor) {
        return this.httpClient.put<Vendor>('http://localhost:8080/api/vendor' + vendorId, vendor);
    }

    deleteVendor(vendorId: string) {
        return this.httpClient.delete<Vendor>('http://localhost:8080/api/vendor' + vendorId);
    }
}