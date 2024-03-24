import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  newCategoryForm: UntypedFormGroup = this.fb.group({
    name: ['', Validators.required],
    displayName: ['', Validators.required],
    description: ['', Validators.required],
  });
  
  constructor(private fb: UntypedFormBuilder, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  createCategory() {
    let category: Category = {
      name: this.newCategoryForm.controls['name'].value,
      displayName: this.newCategoryForm.controls['displayName'].value,
      description: this.newCategoryForm.controls['description'].value,
      exhibits: []
    };

    this.categoryService.createCategory(category).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.router.navigate(['/admin/users']);
      }
    })
  }

}
