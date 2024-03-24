import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  order!: Order;
  orderId: string = '';
  exhibits: Exhibit[] = [];
  vendors: Vendor[] = [];
  catalogs: Catalog[] = [];
  categories: Category[] = [];
  cartItems: Item[] = [];

  selectedVendor!: Vendor;
  selectedCatalog!: Catalog;

  editOrderForm: UntypedFormGroup = this.fb.group({
    vendor: ['', Validators.required],
    catalog: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, 
    private activatedRoute: ActivatedRoute, 
    private vendorService: VendorService,
    private catalogService: CatalogService, 
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.orderId = params['orderId'];
      this.orderService.getOrderById(this.orderId).subscribe({
        next: (response) => {
          this.order = response.order;
        },
        error: (error) => {},
        complete:  () => {
          this.updateOrderValues();
        }
      });
    });

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
    });
  }

  updateOrderValues() {
    this.editOrderForm.controls['vendor'].setValue(this.order.vendor);
    this.editOrderForm.controls['catalog'].setValue(this.order.catalog);
    this.cartItems = this.order.items as Item[];
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

  updateOrder(event: any) {
    let order: Order = {
      vendor: this.editOrderForm.controls['vendor'].value,
      catalog: this.editOrderForm.controls['catalog'].value,
      creator: 'superadmin',
      items: this.cartItems
    } as Order;
    this.orderService.updateOrder(this.orderId, order).subscribe({
      next: (response) => {},
      error: (error) => { console.log(error); },
      complete: () => {}
    });
  }

}
