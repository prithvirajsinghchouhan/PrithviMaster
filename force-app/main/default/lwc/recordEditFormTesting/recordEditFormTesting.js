import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RecordEditFormTesting extends LightningElement {

    handleSuccess(event)
    {
        alert('testing'+event.detail.id);
        this.dispatchEvent(new CustomEvent('closemodelpopup'));
        const evt = new ShowToastEvent({
            title: 'Contact created',
            message: 'Contact successfully created with Id:'+event.detail.id,
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }

    handleSubmit(event){
        event.preventDefault();  
        alert('dfhdfhfddf11222');     // stop the form from submitting
        const fields = event.detail.fields;
        //fields.Street = '32 Prince Street';
        this.template.querySelector('lightning-record-edit-form').submit(fields);
     }
}