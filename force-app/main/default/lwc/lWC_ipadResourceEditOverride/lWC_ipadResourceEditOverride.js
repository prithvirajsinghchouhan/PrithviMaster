/* eslint-disable no-console */
import { LightningElement, wire, api, track } from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

export default class LWC_ipadResourceEditOverride extends NavigationMixin(LightningElement) {
    @api recordId;
    @track relatedrecord;

     @wire(getRecord,{recordId : '$recordId',layoutTypes: ['Full'],modes : ['View']})
     wiredRecord({ error, data }) {
         if(data)
         {
            this.relatedrecord = data.fields.Test_Name__c.value;
         }
         else{
             console.log('error'+error);
         }
     }

    cancelDialog()
    {
        // eslint-disable-next-line no-alert
        //alert('vvjcv'+this.relatedrecord);
        // eslint-disable-next-line no-console
        //console.log('fddjfdfsjjs'+this.recordId);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.relatedrecord,
                objectApiName: 'Test_2__c', // objectApiName is optional
                actionName: 'view'
            }
        });
    }
}