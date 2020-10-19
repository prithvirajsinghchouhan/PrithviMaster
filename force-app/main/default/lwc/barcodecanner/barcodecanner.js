import { LightningElement,track} from 'lwc';
//import {ShowToastEvent} from 'lightning/platformShowToastEvent';
//import { loadScript } from 'lightning/platformResourceLoader';//Import methods from the platformResourceLoader module
import Quagga from '@salesforce/resourceUrl/Quaggajs';
//import BarcodeImage from '@salesforce/resourceUrl/BarImage';
//import BarcodeScriptScan1 from '@salesforce/resourceUrl/barcodeScanner_quagga';
 
export default class BarcodeScanner extends LightningElement {
@track barCode1;

renderedCallback() {
    loadScript(this, Quagga + '/quagga.js')
    .then(() => {
        console.log('Loaded');
    })
    .catch(error => {
        console.log('Not Loaded');
    });
}
  /*connectedCallback(){
    if (window.addEventListener) {
      //  alert('window.addEventListener--->'+window.addEventListener);
        window.addEventListener("message", function(result){
         // $A.util.removeClass(this.template.querySelector('_barCode'),"slds-hide");
         this.template.querySelector('#_barCode').classList.add('slds-hide');
            var _result = JSON.parse(result.data);
              var barCode = 'NULL';
           try{
                  barCode = _result.codeResult.code;
              }catch(e){
                 console.log('result is ', _result);
              }
              this.barCode1=barCode;
            //  $A.util.addClass(this.template.querySelector('_spinner'),"slds-hide");
            this.template.querySelector('#_spinner').classList.add('slds-hide');
        }, false);
        
    } else {
        window.attachEvent("onmessage", function(result){
         // $A.util.removeClass(this.template.querySelector('_barCode'),"slds-hide");
         this.template.querySelector('#_barCode').classList.add('slds-hide');
            var _result = JSON.parse(result.data);
              var barCode = 'NULL';
           try{
                  barCode = _result.codeResult.code;
              }catch(e){
                 console.log('result is ', _result);
              }
              this.barCode1=barCode;
              //$A.util.addClass(this.template.querySelector('_spinner'),"slds-hide");
              this.template.querySelector('#_spinner').classList.add('slds-hide');
        });
    }
    
  }*/

  

  scanBarCode(){
      var barcodeContainer = this.template.querySelector('uploadBarcode').getElement();
      barcodeContainer.click();
  }

  uploadBarcode(event){
     // $A.util.removeClass(this.template.querySelector('_spinner'),"slds-hide");
     this.template.querySelector('#_spinner').classList.add('slds-hide');
      var file = event.target.files[0];
      var reader = new FileReader();
      var blob = file.slice(0, file.size);
      reader.readAsBinaryString(blob);

      reader.onloadend = function(e) {
          if (e.target.readyState === FileReader.DONE) {

              var fileContent = 'data:' + file.type + ';base64,' + btoa(e.target.result);
              var barCodeImage = this.template.querySelector('barCodeImage').getElement();
              barCodeImage.src = fileContent;
             // $A.util.removeClass(this.template.querySelector('_barCodeImageContainer'),"slds-hide");
             this.template.querySelector('#_barCodeImageContainer').classList.add('slds-hide'); 
             var quaggaData = {};
              quaggaData.imageWidth = 800;
              if(barCodeImage.naturalWidth>800){
                quaggaData.imageWidth = barCodeImage.naturalWidth;
              }
              quaggaData.fileContent = fileContent;
              var quaggaFrame = cmp.find('_quaggaFrame');
              quaggaFrame.getElement().contentWindow.postMessage(JSON.stringify(quaggaData), '*');

          }
      }
  }

  readthebarcode(event)
  {
    var file = event.target.files[0];
    var imgURL = URL.createObjectURL(file);
    var reader = new FileReader();
    Quagga.decodeSingle(
        {
          inputStream: {
            size: 640,
            singleChannel: false
          },
          locator: {
            patchSize: "large",
            halfSample: false
          },
          decoder: {
            readers: ["upc_reader", "code_128_reader", "code_39_reader", "code_39_vin_reader", "ean_8_reader", "ean_reader", "upc_e_reader", "codabar_reader"]
        },
          locate: true,
          src: imgURL
        },
     function(result){
          if(result && result.codeResult && result.codeResult.code)
          {
            console.log('decode value : '+result.codeResult.code);
          }else{
            console.log('Decode Error');
          }
        });
  }

}
