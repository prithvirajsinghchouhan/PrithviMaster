import { LightningElement,api, wire, track } from 'lwc';
import getAllCriteriaRecords from '@salesforce/apex/CustomAssignmentRuleCntrl.getAllCriteriaRecords';

export default class CustomAssignmentRuleViewLWC extends LightningElement {

    @api recordId;
    @track allcriteriarecords;
    @track allrecs = [];
    @track checkboxVal = true;
    @track checkboxfalse = false;

    @wire(getAllCriteriaRecords,{assignmentId:'$recordId'})
    allFields({ error, data }) {
        if(data){
            console.log('JSON data field'+JSON.stringify(data));
            this.allcriteriarecords = data;
            console.log('djf@@ : '+JSON.stringify(this.allcriteriarecords));
        }
        else{
            console.log('JSON error field'+JSON.stringify(error));
        }
    }

}