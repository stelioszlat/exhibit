import { Component, OnInit } from '@angular/core';
import { Catalog } from 'src/app/models/catalog.model';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.css']
})
export class CatalogsComponent implements OnInit {

  catalogs: Catalog[] = [];

  constructor(private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.catalogService.catalogs.subscribe(catalogs => {
      this.catalogs = catalogs;
    });
    this.getCatalogs();
  }

  getCatalogs(): Catalog[] { 
    this.catalogService.getCatalogs().subscribe({
      next: (response) => {
        this.catalogs = response.catalogs;
      }
    })
    
    return this.catalogs;
  }

}
