import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUser, User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  message: string = '';

  newUserForm: UntypedFormGroup = this.fb.group({
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    rePassword: ['', Validators.required],
    isAdmin: [false],
    isSuperAdmin: [false]
  });

  constructor(private fb: UntypedFormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  createUser(): void {
    let user: NewUser = {
      _id: '',
      email: this.newUserForm.controls['email'].value,
      username: this.newUserForm.controls['username'].value,
      password: this.newUserForm.controls['password'].value,
      rePassword: this.newUserForm.controls['rePassword'].value,
      isAdmin: this.newUserForm.controls['isAdmin'].value,
      isSuperAdmin: this.newUserForm.controls['isAdmin'].value ? true : this.newUserForm.controls['isSuperAdmin'].value
    }

    if (this.newUserForm.controls['password'].value !== this.newUserForm.controls['rePassword'].value) {
      this.message = 'Please confirm password (password is not the same)';
      return;
    }
    
    this.userService.createUser(user).subscribe({
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
