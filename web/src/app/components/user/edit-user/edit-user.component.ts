import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NewUser, User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user!: NewUser;
  tokens: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  userId: string = '';
  checkToken: boolean = false;

  editUserForm: UntypedFormGroup = this.fb.group({
    email: [''],
    username: [''],
    password: [''],
    rePassword: [''],
    isAdmin: [false],
    isSuperAdmin: [false],
    apiToken: ['']
  });

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private fb: UntypedFormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
      this.userService.getUser(this.userId).subscribe({
        next: (user) => {
          this.user = user as NewUser
        },
        error: (error) => {},
        complete:  () => {
          this.updateUserValues();
        }
      });
    });
  }

  updateUserValues() {
    this.editUserForm.patchValue({
      email: this.user.email,
      username: this.user.username,
      isAdmin: this.user.isAdmin,
      isSuperAdmin: this.user.isSuperAdmin,
      apiToken: this.user.apiToken
    });
  }
   
  updateUser(): void {
    let user: NewUser = {
      _id: '',
      email: this.editUserForm.controls['email'].value,
      username: this.editUserForm.controls['username'].value,
      password: this.editUserForm.controls['password'].value,
      rePassword: this.editUserForm.controls['rePassword'].value,
      isAdmin: this.editUserForm.controls['isAdmin'].value,
      isSuperAdmin: this.editUserForm.controls['isSuperAdmin'].value,
    }

    if (this.editUserForm.controls['password'] !== this.editUserForm.controls['rePassword']) {
      throw new Error('Please confirm password (password is not the same)');
    }
    this.userService.updateUser(this.userId, user).subscribe({
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
