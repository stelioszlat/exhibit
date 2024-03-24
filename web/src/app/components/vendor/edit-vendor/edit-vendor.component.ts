import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from 'src/app/models/vendor.model';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.css']
})
export class EditVendorComponent implements OnInit {

  vendorId: string = '';

  editVendorForm: UntypedFormGroup = this.fb.group({
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

  constructor(private fb: UntypedFormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private vendorService: VendorService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.vendorId = params['vendorId'];
    });
  }

  updateVendor() {
    let vendor: Vendor = {
      _id: '',
      name: this.editVendorForm.controls['name'].value,
      street: this.editVendorForm.controls['street'].value,
      zip: this.editVendorForm.controls['zip'].value,
      city: this.editVendorForm.controls['city'].value,
      country: this.editVendorForm.controls['country'].value,
      phones: [],
      catalogs: [],
      openHour: this.editVendorForm.controls['openHour'].value,
      closeHour: this.editVendorForm.controls['closeHour'].value,
      daysOpen: []
    };

    this.vendorService.updateVendor(this.vendorId, vendor).subscribe({
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
