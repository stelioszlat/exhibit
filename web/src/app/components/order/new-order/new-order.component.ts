import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Catalog } from 'src/app/models/catalog.model';
import { Category } from 'src/app/models/category.model';
import { Item } from 'src/app/models/item.model';
import { Order } from 'src/app/models/order.model';
import { Vendor } from 'src/app/models/vendor.model';
import { CartService } from 'src/app/services/cart.service';
import { CatalogService } from 'src/app/services/catalog.service';
import { CategoryService } from 'src/app/services/category.service';
import { Exhibit, ExhibitService } from 'src/app/services/exhibit.service';
import { OrderService } from 'src/app/services/order.service';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  exhibits: Exhibit[] = [];
  vendors: Vendor[] = [];
  catalogs: Catalog[] = [];
  categories: Category[] = [];
  cartItems: Item[] = [];

  selectedVendor!: Vendor;
  selectedCatalog!: Catalog;

  newOrderForm: UntypedFormGroup = this.fb.group({
    vendor: ['', Validators.required],
    catalog: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, 
    private vendorService: VendorService,
    private catalogService: CatalogService, 
    private categoryService: CategoryService,
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.vendorService.getVendors().subscribe({
      next: (response) => {
        this.vendors = response.vendors;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
      }
    });

    this.cartService.cart.subscribe(cart => {
      this.cartItems = cart;
    })
  }

  selectVendor(event: any) {
    this.selectedVendor = this.vendors.find(v => {
      return v.name === event.option.value;
    }) as Vendor;
    this.catalogs = this.selectedVendor.catalogs
  }

  selectCatalog(event: any) {
    this.selectedCatalog = this.catalogs.find(c => {
      return c.name === event.option.value;
    }) as Catalog;
    this.catalogService.getCatalogById(this.selectedCatalog._id as string).subscribe(response => {
      this.categories = response.catalog.categories;
    });
  }

  saveOrder(event: any) {
    let order: Order = {
      vendor: this.newOrderForm.controls['vendor'].value,
      catalog: this.newOrderForm.controls['catalog'].value,
      creator: 'superadmin',
      items: this.cartItems
    } as Order;
    this.orderService.createOrder(order).subscribe({
      next: (response) => {},
      error: (error) => { console.log(error); },
      complete: () => {}
    });
  }

}
