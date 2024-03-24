import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Exhibit, ExhibitService } from 'src/app/services/exhibit.service';

@Component({
  selector: 'new-exhibit',
  templateUrl: './new-exhibit.component.html',
  styleUrls: ['./new-exhibit.component.css']
})
export class NewExhibitComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;

  file: File | null = null;

  newExhibitForm: UntypedFormGroup = this.fb.group({
    name: ['', Validators.required],
    displayName: ['', Validators.required],
    description: ['', Validators.required],
    image: [],
    sound: [],
    arrived: ['', Validators.required],
    creator: [''],
    value: ['', [Validators.required]],
    quantity: ['', [Validators.required, Validators.min(1)]],
    location: ['']
  });

  constructor(private fb: UntypedFormBuilder, private router: Router, private exhibitService: ExhibitService) { }

  ngOnInit(): void {
  }

  createExhibit() {
    let formData = this.getFormData();
    this.exhibitService.createExhibit(formData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.router.navigate(['/admin/exhibits']);
      }
    });
  }

  onClickFileInputButton(event: any): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
  }

  getFormData(): FormData {
      let formData = new FormData();
      formData.append('name', this.newExhibitForm.controls['name'].value);
      formData.append('displayName', this.newExhibitForm.controls['displayName'].value);
      formData.append('description', this.newExhibitForm.controls['description'].value);
      formData.append('arrived', this.newExhibitForm.controls['arrived'].value);
      formData.append('creator', this.newExhibitForm.controls['creator'].value);
      formData.append('value', this.newExhibitForm.controls['value'].value);
      formData.append('quantity', this.newExhibitForm.controls['quantity'].value);
      formData.append('location', this.newExhibitForm.controls['location'].value);
      formData.append('image', this.file as Blob, this.file?.name);

      return formData;
  }
}
