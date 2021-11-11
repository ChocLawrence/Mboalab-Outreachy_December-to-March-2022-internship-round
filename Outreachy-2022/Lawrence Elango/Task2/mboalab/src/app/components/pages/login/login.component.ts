import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CoreService } from '../../../core/core.service';
import { Router, NavigationEnd } from "@angular/router";
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public loading = false;
  public destination: any;
  loginForm: FormGroup;

  constructor(public core: CoreService,
    public router: Router,
    private fb: FormBuilder, private authenticationservice: AuthenticationService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmitLogin() {

    if (this.loginFormIsValid()) {
      this.loading = true;
      let values = this.loginForm.value;
      values.username = values.username;

      this.authenticationservice.login(values).then(r => {
        this.core.encryptToLocalStorage('currentUser', JSON.stringify(r));
        this.core.encryptToLocalStorage('menu', JSON.stringify(r.user.role));
        let menu = this.core.decryptFromLocalStorage('menu');

        if (menu == "admin") {
          this.destination = "/console";
        } else if (menu == "user") {
          this.destination = "/dashboard";
        }

        if (!this.core.isEmptyOrNull(this.destination)) {
          this.redirectToDashboard(this.destination);
          this.core.showSuccess("Success", "Login Successful...");
        } else {
          this.core.showError("Oops", "Refresh page and try again..");
        }

        this.loading = false;

      }).catch(e => {
        this.loading = false;
        this.core.handleError(e);
      });

    }

    return false;

  }

  loginFormIsValid() {
    return this.loginForm.controls.username.valid
      && this.loginForm.controls.password.valid;
  }

  redirectToDashboard(destination: string) {
    let timer = setTimeout(() => {
      if (location.href.includes("localhost")) {
        window.location.href = "http://localhost:4200" + destination;
      } else {
        window.location.href = "/mboalab" + destination;
      }
      clearTimeout(timer);
    }, 2000);
  }

}
