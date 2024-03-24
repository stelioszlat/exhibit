import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exhibit } from 'src/app/models/exhibit.model';
import { Item } from 'src/app/models/item.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input('max')
  maxLength: number = 99;
  @Input('item')
  exhibit!: Exhibit;
  item!: Item;
  @Output() itemAdded: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  itemQuantity: number = 1;
  totalItemQuantity: number = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.item = Object.assign({...this.exhibit} as Item);

  }

  onAddItemToCart(event: any) {
    this.item = Object.assign({...this.exhibit} as Item);
    this.item.orderQuantity = this.itemQuantity;
    this.totalItemQuantity += this.itemQuantity;
    console.log(this.item);
    this.cartService.addToCart(this.item);
    this.itemAdded.emit(true);
  }

  onRemoveItemFromCart(event: any) {
    this.totalItemQuantity = 0;
    this.cartService.deleteFromCart(this.item);
  }

  changeItemQuantity(event: any) {
    this.itemQuantity = +event.target.value;
  }

  isItemOnCart() {
    return !!this.cartService.cart.getValue().find(item => {return item._id === this.item._id});
  }

}
