import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  categoryId: string = '';

  editCategoryForm: UntypedFormGroup = this.fb.group({
    name: ['', Validators.required],
    displayName: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(private fb: UntypedFormBuilder, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  updateCategory() {
    let category: Category = {
      name: this.editCategoryForm.controls['name'].value,
      displayName: this.editCategoryForm.controls['displayName'].value,
      description: this.editCategoryForm.controls['description'].value,
      exhibits: []
    }
    this.categoryService.updateCategory(this.categoryId, category).subscribe({
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
