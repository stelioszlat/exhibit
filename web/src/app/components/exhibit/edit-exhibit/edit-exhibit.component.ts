import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Exhibit, ExhibitService } from 'src/app/services/exhibit.service';

@Component({
  selector: 'edit-exhibit',
  templateUrl: './edit-exhibit.component.html',
  styleUrls: ['./edit-exhibit.component.css']
})
export class EditExhibitComponent implements OnInit {

  exhibitId: string = '';

  editExhibitForm: UntypedFormGroup = this.fb.group({
    name: [''],
    displayName: ['',],
    description: ['',],
    arrived: ['',],
    creator: [''],
    value: [''],
    quantity: ['', Validators.maxLength(2)],
    location: ['']
  });

  constructor(private fb: UntypedFormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private exhibitService: ExhibitService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.exhibitId = params['id'];
    });
  }

  updateExhibit(): void {
    let exhibit = this.editExhibitForm.value as Exhibit;
    this.exhibitService.updateExhibit(this.exhibitId, exhibit).subscribe({
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
