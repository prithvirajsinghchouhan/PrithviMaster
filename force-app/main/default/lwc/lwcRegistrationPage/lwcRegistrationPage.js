import { LightningElement,track,wire } from 'lwc';
import metadatarecordsmethod from '@salesforce/apex/LWCRegistrationCntrl.getMetadatarecords';
import Testingmethod from '@salesforce/apex/LWCRegistrationCntrl.TestingMethod';

export default class LwcRegistrationPage extends LightningElement {

    @track metadatarecords;
    @track testdata;

    @wire(Testingmethod)
    testrec({error,data}){
        alert('jdfdfdf33333'+JSON.stringify(data) + 'dfsfs77777'+JSON.stringify(error));
        this.testdata = data;
    }       // alert('jdfdfdf33333'+data + 'dfsfs77777'+error);
       

    @wire(metadatarecordsmethod)
    metadatarecords;
    
}