import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService implements OnInit {

    orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);

    constructor (private httpClient: HttpClient) {}

    ngOnInit() {
        this.getOrders().subscribe({
            next: (response) => { this.orders.next(response.orders) },
            error: (error) => { console.error(error); }, 
            complete: () => {}
        });
    }

    getOrders() {
        return this.httpClient.get<{ orders: Order[] }>('http://localhost:8080/api/order');
    }

    getOrderById(orderId: string) {
        return this.httpClient.get<{ order: Order }>('http://localhost:8080/api/order/' + orderId);
    }

    getOrderLink(orderId: string | undefined) {
        return this.httpClient.get<{ orderLink: string }>('http://localhost:8080/api/order/' + orderId + '/link');
    }

    createOrder(order: Order) {
        return this.httpClient.post<Order>('http://localhost:8080/api/order', order);
    }

    updateOrder(orderId: string, order: Order) {
        return this.httpClient.put<Order>('http://localhost:8080/api/order/' + orderId, order);
    }
    
    deleteOrder(orderId: string) {
        return this.httpClient.delete<Order>('http://localhost:8080/api/order/' + orderId);
    }
}