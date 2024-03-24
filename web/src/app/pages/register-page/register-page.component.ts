import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  
  registerForm: UntypedFormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.maxLength(15)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    rePassword: ['', [Validators.required, Validators.minLength(4)]]
  }, {
    validators: this.passwordMatchValidator
  });

  constructor(private fb: UntypedFormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.authService.register({
      email: this.registerForm.controls['email'].value, 
      username: this.registerForm.controls['username'].value, 
      password: this.registerForm.controls['password'].value, 
      rePassword: this.registerForm.controls['password'].value
    });
  }

  passwordMatchValidator(formGroup: UntypedFormGroup) {
    const password = formGroup.controls['password'].value;
    const rePassword = formGroup.controls['rePassword'].value;
    return password === rePassword ? null : { mismatch: true };
  }
}
