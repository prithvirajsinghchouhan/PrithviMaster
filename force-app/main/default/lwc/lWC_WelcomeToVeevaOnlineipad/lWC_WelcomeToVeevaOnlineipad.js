import { LightningElement, wire, track } from 'lwc';
import U_Id from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/User.Name';

export default class LWC_WelcomeToVeevaOnlineipad extends LightningElement {

    @track username;
    @track error;
    @track todaydate;

    todaydate = new Date();
    //tdate = new Date();
    // eslint-disable-next-line no-undef
    //todaydate = Date.formate(new Date(),"EEEE MMMM dd, yyyy");

    @wire(getRecord,{recordId: U_Id,fields:[NAME_FIELD]})
    fetchUserName({data,error})
    {
        if(data)
        {
            this.username = data.fields.Name.value;
        }
        else{
            this.error = error;
        }
    }
}