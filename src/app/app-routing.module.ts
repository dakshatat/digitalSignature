import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignaturePadComponent } from './signature-pad/signature-pad.component';

const routes: Routes = [
  {
    path: '', component: SignaturePadComponent
    //loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'open-signature',
    loadChildren: () => import('./open-signature/open-signature.module').then( m => m.OpenSignaturePageModule)
  },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
