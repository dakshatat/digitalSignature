import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenSignaturePage } from './open-signature.page';

const routes: Routes = [
  {
    path: '',
    component: OpenSignaturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenSignaturePageRoutingModule {}
