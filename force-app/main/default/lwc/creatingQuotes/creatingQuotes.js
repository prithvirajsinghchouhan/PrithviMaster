import { LightningElement, track } from 'lwc';

// Importing Apex Class method
import saveQuote from '@salesforce/apex/LWCQuoteController.saveQuoteRecord';

// importing to show toast notifictions
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import QUOTE_OBJECT from '@salesforce/schema/Quote';
import NAME_FIELD from '@salesforce/schema/Quote.Name';
import EXPIRATIONDATE_FIELD from '@salesforce/schema/Quote.ExpirationDate';
import OPP_FIELD from '@salesforce/schema/Quote.OpportunityId';
import SYN_FIELD from '@salesforce/schema/Quote.IsSyncing';
import ACC_FIELD from '@salesforce/schema/Quote.Accountid';
import STATUS_FIELD from '@salesforce/schema/Quote.Status';
import DESC_FIELD from '@salesforce/schema/Quote.Description';
import EMAIL_FIELD from '@salesforce/schema/Quote.Email';
import PHONE_FIELD from '@salesforce/schema/Quote.Phone';
import CON_FIELD from '@salesforce/schema/Quote.ContactId';
//import SALESREPNAME_FIELD from '@salesforce/schema/Quote.Sales_Rep_Name_Area__c';
//import COMPANYADDR_FIELD from '@salesforce/schema/Quote.Company_Address__c';
//import COADDR_FIELD from '@salesforce/schema/Quote.Co_Addr__c';
import BILLINGNAME_FIELD from '@salesforce/schema/Quote.BillingName';
import BILLINGADDRESS_FIELD from '@salesforce/schema/Quote.BillingAddress';
//import OPENINGCOMMENTS_FIELD from '@salesforce/schema/Quote.Opening_Comments__c';
//import OPENINGCOMMENTSDEL_FIELD from '@salesforce/schema/Quote.Default_Opening_Comments_del__c';
//import CLOSUREAREA_FIELD from '@salesforce/schema/Quote.Closure_Area__c';
//import DEFAULTCLOSURE_FIELD from '@salesforce/schema/Quote.Default_Closure_Area_del__c';
//import DEFAULTFOOTER_FIELD from '@salesforce/schema/Quote.Default_Footer_del__c';
import DISCOUNT_FIELD from '@salesforce/schema/Quote.Discount';
import GRANDTOTAL_FIELD from '@salesforce/schema/Quote.GrandTotal';

/**
 * Creates Quote records.
 */
export default class QuoteCreator extends LightningElement {
    @track quoteRecord = {
        nameField : NAME_FIELD,
        ExpirationDateField : EXPIRATIONDATE_FIELD,
        synField : SYN_FIELD,
        statusfield : STATUS_FIELD,
        oppField : OPP_FIELD,
		accField : ACC_FIELD,
		descField : DESC_FIELD,
		emailField : EMAIL_FIELD,
		phoneField : PHONE_FIELD,
		contactField : CON_FIELD,
		//salesrepnameField : SALESREPNAME_FIELD,
		//companyaddressField : COMPANYADDR_FIELD,
		//coaddrField : COADDR_FIELD,
		billingnameField : BILLINGNAME_FIELD,
		billingaddressField : BILLINGADDRESS_FIELD,
		//openingcommentsField : OPENINGCOMMENTS_FIELD,
		//openingcommentsdelField : OPENINGCOMMENTSDEL_FIELD,
		//closureareaField : CLOSUREAREA_FIELD,
		//defaultclosureField : DEFAULTCLOSURE_FIELD,
		//defaultfooterField : DEFAULTFOOTER_FIELD,
		discountField : DISCOUNT_FIELD,
		grandtotalField : GRANDTOTAL_FIELD
        
    };

    quoteObject = QUOTE_OBJECT;
    nameField = NAME_FIELD;
    oppField = OPP_FIELD;
    accField = ACC_FIELD;
    synField = SYN_FIELD;
    statusField = STATUS_FIELD;
    descField = DESC_FIELD;
    ExpirationDateField = EXPIRATIONDATE_FIELD;    
	emailField = EMAIL_FIELD;
    phoneField = PHONE_FIELD;
    contactField = CON_FIELD;
    //salesrepnameField = SALESREPNAME_FIELD;
    //companyaddressField = COMPANYADDR_FIELD;
    //coaddrField = COADDR_FIELD;
	billingnameField = BILLINGNAME_FIELD;
    billingaddressField = BILLINGADDRESS_FIELD;
	//openingcommentsField = OPENINGCOMMENTS_FIELD;
	//openingcommentsdelField = OPENINGCOMMENTSDEL_FIELD;
	//closureareaField = CLOSUREAREA_FIELD;
	//defaultclosureField = DEFAULTCLOSURE_FIELD;
	//defaultfooterField = DEFAULTFOOTER_FIELD;
	discountField = DISCOUNT_FIELD;
	grandtotalField = GRANDTOTAL_FIELD;
	

    handleQuoteCreated(){
        // Run code when account is created.
    }
    handleSave() {
        saveQuote({objAcc: this.quoteRecord})
        .then(result => {
            // Clear the user enter values
            this.quoteRecord = {};

            window.console.log('result ===> '+result);
            // Show success messsage
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success!!',
                message: 'Quote Created Successfully!!',
                variant: 'success'
            }),);
        })
        .catch(error => {
            this.error = error.message;
        });
    }
}