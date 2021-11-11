import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { BlogDetailsRoutingModule } from './blog-details-routing.module';
import { BlogDetailsComponent } from './blog-details.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";
import { ContentComponent } from './content/content.component';


@NgModule({
  declarations: [BlogDetailsComponent, ContentComponent],
  imports: [
    CommonModule,
    BlogDetailsRoutingModule,
    SharedModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.4)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: true
    }),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ]
})
export class BlogDetailsModule { }
