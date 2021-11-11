import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CoreService } from '../../../core/core.service';
import { Router, NavigationEnd } from "@angular/router";
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';


@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.css']
})
export class AccountVerificationComponent implements OnInit {

  public display: any;
  public verification = false;
  public state: any;
  public verificationId: any;

  public loadingData = false;
  public loading = false;
  public animationType = 'wanderingCubes';


  constructor(public core: CoreService,
    public router: Router,
    private fb: FormBuilder, private authenticationservice: AuthenticationService) { }

  ngOnInit(): void {
    this.processVerification();
  }


  async processVerification() {
    //check current url
    let splitUrl = this.router.url.split('/');
    this.verificationId = splitUrl[2];

    if (!this.core.isEmptyOrNull(this.verificationId)) {

      await this.verifyAccount(this.verificationId);

    } else {
      this.redirectToLogin();
    }


  }

  async verifyAccount(id: string) {

    this.loadingData = true;
    this.loading = true;

    await this.authenticationservice
      .verifyAccount(id)
      .then(res => {
        this.verification = true;
        this.timer(2);
        this.loading = false;
        this.loadingData = false;
      })
      .catch(e => {
        this.verification = false;
        this.timer(1);
        this.loading = false;
        this.loadingData = false;
        this.core.handleError(e);
      });

  }

  timer(minute: any) {
    // let minute = 1;
    let seconds: number = minute * 10;
    let textSec: any = "0";
    let statSec: number = 11;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 10;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        this.redirectToLogin();
        clearInterval(timer);
      }
    }, 1000);
  }

  redirectToLogin() {
    this.core.showSuccess('Success', 'Redirecting to login..')
    this.router.navigate(["/login"]);
  }



}
