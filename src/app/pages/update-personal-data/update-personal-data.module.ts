import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePersonalDataPageRoutingModule } from './update-personal-data-routing.module';
import { UpdatePersonalDataPage } from './update-personal-data.page';

// Components
import { HeaderBackComponent } from 'src/app/component/layout/header-back/header-back.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdatePersonalDataPageRoutingModule
  ],
  declarations: [UpdatePersonalDataPage,HeaderBackComponent ]
})
export class UpdatePersonalDataPageModule {}
