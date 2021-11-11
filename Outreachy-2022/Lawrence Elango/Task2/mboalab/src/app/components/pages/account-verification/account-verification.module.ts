import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";
import { AccountVerificationRoutingModule } from './account-verification-routing.module';
import { AccountVerificationComponent } from './account-verification.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AccountVerificationComponent],
  imports: [
    CommonModule,
    AccountVerificationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.4)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: true
    }),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    FormsModule,
    NgbModule
  ]
})
export class AccountVerificationModule { }
