import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/models/vendor.model';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'new-vendor',
  templateUrl: './new-vendor.component.html',
  styleUrls: ['./new-vendor.component.css']
})
export class NewVendorComponent implements OnInit {

  newVendorForm: UntypedFormGroup = this.fb.group({
    name: ['', Validators.required],
    street: ['', Validators.required],
    zip: [null, [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
    city: ['', Validators.required],
    country: ['', Validators.required],
    phones: [[], Validators.required],
    categories: [[], Validators.required],
    openHour: [null],
    closeHour: [null],
    daysOpen: [[], Validators.required]
  });

  constructor(private fb: UntypedFormBuilder, private router: Router, private vendorService: VendorService) { }

  ngOnInit(): void {
  }

  createVendor() {
    let vendor: Vendor = {
      _id: '',
      name: this.newVendorForm.controls['name'].value,
      street: this.newVendorForm.controls['street'].value,
      zip: this.newVendorForm.controls['zip'].value,
      city: this.newVendorForm.controls['city'].value,
      country: this.newVendorForm.controls['country'].value,
      phones: [],
      catalogs: [],
      openHour: this.newVendorForm.controls['openHour'].value,
      closeHour: this.newVendorForm.controls['closeHour'].value,
      daysOpen: []
    };
    this.vendorService.createVendor(vendor).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.router.navigate(['/admin/vendors']);
      }
    });
  }
}
