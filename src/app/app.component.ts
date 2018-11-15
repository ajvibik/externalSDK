import { Component, OnInit } from '@angular/core';
import { StarBarcodeEncoderService } from './service/star-barcode-encoder.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'externalSDK';
  constructor(private starBarcodeEncoderService:StarBarcodeEncoderService){

  }
   ngOnInit() {
    
   }
   getValue(a){
    this.starBarcodeEncoderService.createUPCE(a);
   }
}
