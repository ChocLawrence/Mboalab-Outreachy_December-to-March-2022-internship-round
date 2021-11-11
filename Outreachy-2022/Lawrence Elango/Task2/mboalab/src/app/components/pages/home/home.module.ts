import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgwWowModule } from 'ngx-wow';

import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { BannerComponent } from './banner/banner.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { VideoComponent } from './video/video.component';
import { TeamComponent } from './team/team.component';
import { ProgessBarComponent } from './progess-bar/progess-bar.component';
import { QuoteComponent } from './quote/quote.component';
import { PageCtaComponent } from './page-cta/page-cta.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, BannerComponent, FaqsComponent, AboutComponent, ServicesComponent, VideoComponent, TeamComponent, ProgessBarComponent, QuoteComponent, PageCtaComponent, BlogPostComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgbModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.4)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: true
    }),
    SlickCarouselModule,
    NgCircleProgressModule.forRoot(),
    NgwWowModule,
    FormsModule
  ]
})
export class HomeModule { }
