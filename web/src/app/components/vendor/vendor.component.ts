import { Component, Input, OnInit } from '@angular/core';
import { Vendor } from 'src/app/models/vendor.model';

@Component({
  selector: 'vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  @Input() vendor!: Vendor;

  constructor() { }

  ngOnInit(): void {
  }

}
