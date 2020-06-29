import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-open-signature',
  templateUrl: './open-signature.page.html',
  styleUrls: ['./open-signature.page.scss'],
})
export class OpenSignaturePage implements OnInit {
  signature:any
  constructor(private route: ActivatedRoute,private navCtrl:NavController) {
    debugger
    this.route.queryParams.subscribe(params => {
      debugger
      this.signature=params['data']
      console.log("data rcv",this.signature)
  });
 
   }

  ngOnInit() {
  }
  goBack(){
    debugger
    this.navCtrl.pop()
  }
}
