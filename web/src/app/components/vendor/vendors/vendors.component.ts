import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/services/vendor.service';
import { Vendor } from '../../../models/vendor.model';

@Component({
  selector: 'vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  vendors: Vendor[] = [];

  constructor(private vendorService: VendorService) { }

  ngOnInit(): void {
    this.vendorService.getVendors().subscribe(response => {
      this.vendors = response.vendors;
    });
  }

}
