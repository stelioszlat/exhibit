import { Component, Input, OnInit } from '@angular/core';
import { Catalog } from 'src/app/models/catalog.model';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  @Input() catalog!: Catalog;

  constructor() { }

  ngOnInit(): void {
  }

}
