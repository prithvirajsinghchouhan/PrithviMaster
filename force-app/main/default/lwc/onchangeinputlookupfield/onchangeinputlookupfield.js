/* eslint-disable no-alert */
/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';
import QUOTE_OBJ from '@salesforce/schema/Quote';
import CON_FIELD from '@salesforce/schema/Quote.ContactId';
import EMAIL_FIELD from '@salesforce/schema/Quote.Email';
import PHONE_FIELD from '@salesforce/schema/Quote.Phone';
import CPHONE_FIELD from '@salesforce/schema/Contact.Phone';
import CEMAIL_FIELD from '@salesforce/schema/Contact.Email';
import getContDetail from '@salesforce/apex/TestingDataFetch.getContactData';
import { getFieldValue } from 'lightning/uiRecordApi';

/*const FIELDS = [
    'Contact.Name',
    'Contact.Title',
    'Contact.Phone',
    'Contact.Email',
];*/

export default class Onchangeinputlookupfield extends LightningElement {

    @track pvalue;
    @track evalue;

    
    contactlookup = CON_FIELD;
    contactobj = QUOTE_OBJ;
    phoneField = PHONE_FIELD;
    emailField = EMAIL_FIELD;

    fetchingaccid(event)
    {
        alert('dfsssd'+event.target.value);
        console.log('xcdcdc'+event.target.value);
        console.log('fdfsdsfs'+this.template.querySelector('[data-accid]').value);
        alert('fdgdsffds'+this.template.querySelector('[data-accid]').value);

        getContDetail({conId : event.target.value })
            .then(result => {
                alert('fdfdff'+JSON.stringify(result));
                alert('fdfdff'+result);
                this.pvalue = result["Phone"];//getFieldValue(result,CPHONE_FIELD);
                this.evalue = result["Email"];//getFieldValue(result,CEMAIL_FIELD);
                alert('P'+this.pvalue + 'E'+this.evalue );
            })
            .catch(error => {
                alert('dgdfsfds'+error);
                this.error = error;
            });
    }

    handleQuoteCreated()
    {

    }
}