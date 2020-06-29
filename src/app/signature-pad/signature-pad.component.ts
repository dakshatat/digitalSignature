import { Component, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { File } from '@ionic-native/file/ngx';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss'],
})
export class SignaturePadComponent implements OnInit {
  @ViewChild('sPad', {static: true}) signaturePadElement;
  signaturePad: any;
  dataURL
  constructor(private base64ToGallery: Base64ToGallery,private file:File,private navCtrl:NavController,
    private androidPermissions:AndroidPermissions) { 

    this.getPermision()
  }
  async getPermision() {
    debugger
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
    );
   
    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      );
   
      if (!result.hasPermission) {
        throw new Error('Permissions required');
      }
   
      // ok, a user gave us permission, we can get him identifiers after restart app
     
    }
   }
  ngOnInit() {}

  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
  }


  changeColor() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    const color = 'rgb(' + r + ',' + g + ',' + b + ')';
    this.signaturePad.penColor = color;
  }

  clear() {
    debugger
    this.signaturePad.clear();
  }

  undo() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }

  saveImage() {
    debugger
    if (this.signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      let rcvImg
      let dataURL
      dataURL = this.signaturePad.toDataURL('image/jpeg');
      // console.log("rcv img",rcvImg)
      // let name
      // name=  rcvImg.substring(0, rcvImg.lastIndexOf(','));
      // this.dataURL = rcvImg.substring(rcvImg.lastIndexOf(',') + 1, rcvImg.length);
      // console.log("dataurl img",this.dataURL)
      // console.log("name",name)

      this.download(dataURL, 'signature.png');
    }
  }



  // download(dataURL, filename){
  //   debugger
  //   this.base64ToGallery.base64ToGallery(dataURL,  {
  //     prefix: 'img_',
  //     mediaScanner: true
  // },).then(
  //     res => {
  //       debugger
  //       alert('Signature saved.');

  //       console.log('Saved image to gallery ', res)},
  //     err => {
  //       debugger
  //       console.log('Error saving image to gallery ', err)}
  //   );
  // }

  download(dataURL, filename) {
    debugger
    // if (navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') === -1) {
    //   debugger
    //   window.open(dataURL);
  //  } else {
      debugger
      const blob = this.dataURLToBlob(dataURL,'image/jpeg');
      console.log("blob",blob)
      let fileName = "Signature" + "-" + Date.now()+".jpeg";
      let directory = "file:///storage/emulated/0/"
      this.file.writeFile(directory,fileName, blob).then((res:any)=>{
        debugger
        console.log("rcv img",res)
      })
     // let options:WriteOptions = {};
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = filename;

  //     document.body.appendChild(a);
  //     a.click();

  //     window.URL.revokeObjectURL(url);
  // //  }
  }

  // dataURLToBlob(dataURL) {
  //   debugger
  //   // Code taken from https://github.com/ebidel/filer.js
  //   const parts = dataURL.split(';base64,');
  //   const contentType = parts[0].split(':')[1];
  //   var binaryString = window.atob(parts[1]);
  //   console.log("binaryString", binaryString)
  //   var binaryLen = binaryString.length;
  //   console.log("binaryLen", binaryLen)
  //   var bytes = new Uint8Array(binaryLen);
  //   console.log("bytes", bytes)
  //   for (var i = 0; i < binaryLen; i++) {
  //     var ascii = binaryString.charCodeAt(i);
  //     bytes[i] = ascii;
  //   }
  //   console.log("bytes", bytes)
  //   let blob = new Blob([bytes], { type: contentType });;
  //   return blob

  // }

  dataURLToBlob(dataURL, contentType) {
    debugger
    contentType = contentType || '';
   let sliceSize = 512;
   const parts = dataURL.split(';base64,');
   let data = parts[1]
    var byteCharacters = window.atob(data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      debugger
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

 

  // saveJPG() {
  //   if (this.signaturePad.isEmpty()) {
  //     alert('Please provide a signature first.');
  //   } else {
  //     const dataURL = this.signaturePad.toDataURL('image/jpeg');
  //     this.download(dataURL, 'signature.jpg');
  //   }
  // }

  // saveSVG() {
  //   if (this.signaturePad.isEmpty()) {
  //     alert('Please provide a signature first.');
  //   } else {
  //     const dataURL = this.signaturePad.toDataURL('image/svg+xml');
  //     this.download(dataURL, 'signature.svg');
  //   }
  // }
  navigateToNext(){
    debugger
    if (this.signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      let rcvImg
      rcvImg = this.signaturePad.toDataURL();
        // let name
        //  name=  rcvImg.substring(0, rcvImg.lastIndexOf(','));
        //  this.dataURL = rcvImg.substring(rcvImg.lastIndexOf(',') + 1, rcvImg.length);
        const parts = rcvImg.split(';base64,');
      let navigationExtras: NavigationExtras = {
        queryParams: {
            data:rcvImg//parts[1]
        }
      }
   this.navCtrl.navigateForward('/open-signature', navigationExtras)
    }
    
  }
}
