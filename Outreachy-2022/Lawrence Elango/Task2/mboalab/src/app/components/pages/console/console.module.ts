import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { CKEditorModule } from 'ng2-ckeditor';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";
import { DxDataGridModule, DxTooltipModule, DxTemplateModule } from "devextreme-angular";
import { ConsoleRoutingModule } from './console-routing.module';
import { ConsoleComponent } from './console.component';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import {
  NgbDropdownModule,
  NgbButtonsModule,
  NgbAlertModule,
  NgbDatepickerModule,
  NgbModalModule,
  NgbTooltipModule,
  NgbPopoverModule,
  NgbModule
} from "@ng-bootstrap/ng-bootstrap";
import { PostsComponent } from './posts/posts.component';
import { CategoriesComponent } from './categories/categories.component';
import { ModalCategoryComponent } from './modal-category/modal-category.component';
import { ModalPostComponent } from './modal-post/modal-post.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { ModalSubscriberComponent } from './modal-subscriber/modal-subscriber.component';


@NgModule({
  declarations: [ConsoleComponent, ProfileComponent, PostsComponent, CategoriesComponent, ModalCategoryComponent, ModalPostComponent, SettingsComponent, ProfileHeaderComponent, SubscribersComponent, ModalSubscriberComponent],
  imports: [
    CommonModule,
    ConsoleRoutingModule,
    SharedModule,
    FormsModule,
    CKEditorModule,
    NgbDropdownModule,
    NgbButtonsModule,
    NgbAlertModule,
    NgbDatepickerModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.4)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: true
    }),
    NgbModalModule,
    NgbTooltipModule,
    NgbPopoverModule,
    NgbModule,
    ReactiveFormsModule, DxDataGridModule, DxTooltipModule, DxTemplateModule,
    NgMultiSelectDropDownModule
  ]
})
export class ConsoleModule { }
