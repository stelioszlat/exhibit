import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../models/item.model';
import { Exhibit } from './exhibit.service';

@Injectable({
    providedIn: 'root'
})
export class CartService implements OnInit {

    cart: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);

    constructor () {}

    ngOnInit() {
    }

    addToCart(newItem: Item) {
        let cartItems = this.cart.getValue();
        let itemIndex = cartItems.findIndex(item => {
            return newItem._id == item._id;
        });
        const oldItem = cartItems.at(itemIndex);
        if (!!oldItem) {
            newItem.orderQuantity += oldItem.orderQuantity;
            cartItems.splice(itemIndex, 1, Object.assign(newItem));
        } else {
            if (newItem.orderQuantity != 0) {
                cartItems.push(Object.assign(newItem));
            }
        }
        this.cart.next(cartItems);
    }

    deleteFromCart(item: Item) {
        let cartItems = this.cart.getValue();
        let itemIndex = cartItems.findIndex(oldItem => {
            return item._id == oldItem._id;
        });
        let oldItem = cartItems.at(itemIndex);
        if (!oldItem) {
            return;
        }

        if (oldItem.orderQuantity <= 1) {
            cartItems.splice(itemIndex, 1);
        } else {
            oldItem.orderQuantity = 0;
            cartItems.splice(itemIndex, 1, Object.assign(oldItem));
        }
        this.cart.next(cartItems);
    }
}