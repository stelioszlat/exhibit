import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Catalog } from 'src/app/models/catalog.model';
import { Exhibit } from 'src/app/models/exhibit.model';
import { CartService } from 'src/app/services/cart.service';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {

  cart: Exhibit[] = [];
  catalog!: Catalog;
  catalogId: string = '';

  constructor(private activatedRoute: ActivatedRoute, private catalogService: CatalogService, private cartService: CartService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.catalogId = params['catalogId'];
      },
      error: (error) => {},
      complete: () => {
        this.cartService.cart.subscribe(items => {
          this.cart = items;
        });
      }
    });

    this.cartService.cart.subscribe(cart => {
      this.cart = cart;
    });

    this.catalogService.getCatalogById(this.catalogId).subscribe(response => {
      this.catalog = response.catalog;
      console.log(this.catalog);
    });
  }

}
