import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateCredentialsPageRoutingModule } from './update-credentials-routing.module';

// Components
import { HeaderBackComponent } from 'src/app/component/layout/header-back/header-back.component';

import { UpdateCredentialsPage } from './update-credentials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateCredentialsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateCredentialsPage, HeaderBackComponent]
})
export class UpdateCredentialsPageModule {}
