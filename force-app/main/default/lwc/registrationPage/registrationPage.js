/* eslint-disable no-alert */
/* eslint-disable no-console */
import { LightningElement,wire,track } from 'lwc';

import metadatarecordsmethod from '@salesforce/apex/LWCRegistrationController.getMetadatarecords';
import Testingmethod from '@salesforce/apex/LWCRegistrationController.TestingMethod';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import createRecord from '@salesforce/apex/LWCRegistrationController.CreatingData';

export default class RegistrationPage extends LightningElement {

    @track metadatarecords;

    @wire(Testingmethod)
    testrec({error,data}){
        //alert('jdfdfdf33333'+data + 'dfsfs77777'+error);

    }

    @wire(metadatarecordsmethod)
    metadatarecords;
    /*metadatafetch({ error, data }){
        alert('dfdjhfdjfdfggfgdfgd1111'+data);
        if (data) {
            console.log(data);
            // eslint-disable-next-line no-alert
            alert('dfdjhfdjfdfggfgdfgd'+JSON.stringify(data));
            console.log('dfdjdfgdgdsgsgdg');
            this.metadatarecords = data;
        } else if (error) {
            console.log(error);
            //this.error = error;
        }
    }*/
    
    
    finalrecordvalue = {'sobjectType': 'Account' };
    //@track fapi;

    connectedCallback() {
        
    }

    handlevaluechangeevent(event)
    {
        const fapi = event.detail.fieldapi;
        const fieldvalue = event.detail.fieldvalue;
        this.finalrecordvalue[fapi] = fieldvalue;
    }


    saveData()
    {
        createRecord({objAcc: this.finalrecordvalue})
        .then(result => {
            // Clear the user enter values
            this.accRecord = {};

            window.console.log('result ===> '+result);
            // Show success messsage
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success!!',
                message: 'Account Created Successfully!!'+result,
                variant: 'success'
            }),);
        })
        .catch(error => {
            this.error = error.message;
        });
    
    }
    
}