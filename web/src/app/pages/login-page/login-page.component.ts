import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: UntypedFormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private authService: AuthService, private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login({username: this.loginForm.controls['username'].value, password: this.loginForm.controls['password'].value});
  }
  
}
