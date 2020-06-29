import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenSignaturePageRoutingModule } from './open-signature-routing.module';

import { OpenSignaturePage } from './open-signature.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenSignaturePageRoutingModule
  ],
  declarations: [OpenSignaturePage]
})
export class OpenSignaturePageModule {}
