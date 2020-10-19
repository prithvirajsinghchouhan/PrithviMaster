/* eslint-disable no-alert */
/* eslint-disable no-console */
import { LightningElement, api,track,wire } from 'lwc';
import OBJECT_NAME from '@salesforce/schema/Account';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class RegistrationInputFields extends LightningElement {
@api fieldtype;
@api fieldapiname;
@api fieldlabel;
@api picklistvalues;
@api objectName;
@track fieldvalue;
@api required;
@api recordData;
@api sobjectapiname;

alldata;

connectedCallback() {
    //alert('dfdfdhfffffffff');
    console.log('fjhdfdf1111111111'+this.fieldtype);
}


@wire(getObjectInfo, { objectApiName: OBJECT_NAME })
    objectinformation;

get fieldtypedate()
{
    if(this.fieldtype === 'DATE')
    {
        return true;
    }
    return false;
}

get fieldtypetext()
{
    console.log('fjhdfdf'+this.fieldtype);
    if(this.fieldtype === 'TEXT')
    {
        return true;
    }
    return false;
}

get fieldtypecheck()
{
    if(this.fieldtype === 'CHECKBOX')
    {
        return true;
    }
    return false;
}

get fieldtypepick()
{
    if(this.fieldtype === 'PICKLIST')
    {
        return true;
    }
    return false;
}

get fieldtypenumb()
{
    console.log('fjhdfdf1111'+this.fieldtype);
    if(this.fieldtype === 'NUMBER')
    {
        return true;
    }
    return false;
}


handlevalueschange(event)
{
event.preventDefault();

const fieldval = event.target.value;
const fapiname = this.fieldapiname;
this.alldata = {fieldvalue : fieldval,fieldapi: fapiname};
console.log('>>>dfjhdfd'+event.target.value+'fieldval'+fieldval);
const selectEvent = new CustomEvent('valuesetevent', {
detail: this.alldata
});
this.dispatchEvent(selectEvent);
}

@api
handleComboboxChange(event)
{
event.preventDefault();
const fieldval = event.target.value;
const selectEvent = new CustomEvent('valuesetevent', {
fieldvalue: fieldval, fieldapiname : this.fieldapiname
});
this.dispatchEvent(selectEvent);
}

picklistvalues()
{
    var pickoptions = [];
    var pickvals = this.picklistvalues.split(';');
    pickvals.forEach(element => {
        pickoptions.push({'label': element,'value':element});
    });
    return pickoptions;
}
}
