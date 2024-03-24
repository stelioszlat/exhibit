import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Catalog } from 'src/app/models/catalog.model';
import { Category } from 'src/app/models/category.model';
import { Vendor } from 'src/app/models/vendor.model';
import { CatalogService } from 'src/app/services/catalog.service';
import { CategoryService } from 'src/app/services/category.service';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'new-catalog',
  templateUrl: './new-catalog.component.html',
  styleUrls: ['./new-catalog.component.css']
})
export class NewCatalogComponent implements OnInit {

  vendors: Vendor[] = [];
  categories: Category[] = [];
  addCategory: boolean = false;

  newCatalogForm: UntypedFormGroup = this.fb.group({
    name: ['', Validators.required],
    vendor: ['', Validators.required],
    category: ['']
  });
  
  constructor(private fb: UntypedFormBuilder, 
    private router: Router,
    private catalogService: CatalogService, 
    private vendorService: VendorService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.addCategory = false;
  }

  createCatalog() {
    let catalog: Catalog = {
      _id: '',
      name: this.newCatalogForm.controls['name'].value,
      vendor: this.newCatalogForm.controls['vendor'].value,
      categories: []
    }

    this.catalogService.createCatalog(catalog).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.router.navigate(['/admin/catalogs']);
      }
    });
  }

  searchVendor(event: any) {
    setTimeout(() => {
      let value = this.newCatalogForm.controls['vendor'].value;
      this.vendorService.searchVendor(value).subscribe(response => {
        this.vendors = response.vendors;
      });
    }, 1000);
  }

  selectVendor(event: any) {
    this.newCatalogForm.controls['vendor'].setValue(this.vendors.find(v => {
      return v.name === event.option.value;
    })?.name);
  }

  newCategory() {
    this.addCategory = !this.addCategory;
  }

  addNewCategory() {
    console.log("new category added");
    let category: Category = {
      name: this.newCatalogForm.controls['category'].value as string,
      displayName: this.newCatalogForm.controls['category'].value as string,
    } as Category;
    this.categories.push(category);
  }
}
