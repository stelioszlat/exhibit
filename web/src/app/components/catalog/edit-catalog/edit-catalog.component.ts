import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Catalog } from 'src/app/models/catalog.model';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'edit-catalog',
  templateUrl: './edit-catalog.component.html',
  styleUrls: ['./edit-catalog.component.css']
})
export class EditCatalogComponent implements OnInit {

  catalogId = '';

  editCatalogForm: UntypedFormGroup = this.fb.group({
    name: ['', Validators.required],
    vendor: ['', Validators.required],
  });
  
  constructor(private fb: UntypedFormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.catalogId = params['id'];
    });
  }

  updateCatalog() {
    let catalog: Catalog = {
      _id: '',
      name: this.editCatalogForm.controls['name'].value,
      vendor: this.editCatalogForm.controls['vendor'].value,
      categories: []
    }

    this.catalogService.updateCatalogById(this.catalogId, catalog).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.router.navigate(['/admin/users']);
      }
    });
  }

}
