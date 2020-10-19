import { LightningElement, track } from 'lwc';
import getContDetail from '@salesforce/apex/LWCFetchingdata.getContactData';
import CPHONE_FIELD from '@salesforce/schema/Contact.Phone';
import CEMAIL_FIELD from '@salesforce/schema/Contact.Email';
import { getFieldValue } from 'lightning/uiRecordApi';
import { getSObjectValue } from '@salesforce/apex';

export default class Fetchingdatafromapex extends LightningElement {

    @track openModel;
    @track pv;
    @track ev;
    fetchingaccid()
    {
        alert('dfdfdfp111');
       /* alert('dfsssd'+event.target.value);
        console.log('xcdcdc'+event.target.value);
        console.log('fdfsdsfs'+this.template.querySelector('[data-accid]').value);
        alert('fdgdsffds'+this.template.querySelector('[data-accid]').value);*/

        getContDetail({conId : '0036F00003Mo6AMQAZ' })
            .then(result => {
                //alert('fdfdff'+JSON.stringify(result));
                //alert('fdfdff'+result);
                //alert('fdfdff'+result["Phone"]);
                //alert('fdfdff'+result.fields.Phone.value);
                this.pvalue = getSObjectValue(result,CPHONE_FIELD);
                this.pv = getFieldValue(result,CPHONE_FIELD);
                this.evalue = getSObjectValue(result,CEMAIL_FIELD);
                this.ev = getFieldValue(result,CEMAIL_FIELD);
                //alert('P'+this.pvalue + 'E'+this.evalue );
                //alert('P'+JSON.stringify(this.pv) + 'E'+JSON.stringify(this.ev) );
                this.openModel = true;
            })
            .catch(error => {
                alert('dgdfsfds'+error);
                this.error = error;
            });
    }

    closeModal()
    {
        this.openModel = false;
    }

}