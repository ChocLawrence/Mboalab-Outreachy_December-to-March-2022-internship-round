import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CoreService } from '../../../core/core.service';
import { Router, NavigationEnd } from "@angular/router";
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { SubscribersService } from '../../../services/subscribers.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public router: Router, public core: CoreService,
    private fb: FormBuilder, private subscribersService: SubscribersService) { }
  @Input() layout: number | string;
  @Input() logo: number | string;
  @Input() bgimage: number | string;
  @Input() shape: number | string;


  public loading = false;
  public destination: any;
  subscriberForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.subscriberForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }


  ScrolltoTop() {
    const navbar = document.getElementById('backToTop');
    if (document.body.scrollTop >= 100 || document.documentElement.scrollTop > 100) {
      navbar.classList.add('d-block');
    } else {
      navbar.classList.remove('d-block');
    }
  }
  isShow: boolean;
  topPosToStartShowing = 100;
  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  onSubmitSubscriber() {

    if (this.subscriberFormIsValid()) {
      this.loading = true;
      let values = this.subscriberForm.value;

      this.subscribersService.addSubscriber(values).then(r => {
        this.core.showSuccess("Success", "Subscribed Successfully to newsletter");
        this.subscriberForm.reset();
        this.loading = false;

      }).catch(e => {
        this.loading = false;
        this.core.handleError(e);
      });

    }

    return false;

  }

  subscriberFormIsValid() {
    return this.subscriberForm.controls.email.valid;
  }
}
