import { LightningElement,api, wire, track } from 'lwc';
import getAllCriteriaRecords from '@salesforce/apex/CustomAssignmentRuleCntrl.getAllCriteriaRecords';
import deleteCriteriaRecords from '@salesforce/apex/CustomAssignmentRuleCntrl.deleteCriteriaRecords';

export default class CustomAssignmentRuleViewLWC extends LightningElement {

    @api recordId;
    @track allcriteriarecords;
    @track allrecs = [];
    @track checkboxVal = true;
    @track checkboxfalse = false;
    @track showmodel = false;

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

    deleteCriteria(event)
    {
        var val = event.target;
        this.showmodel = true;
        
    }

    handleConfirmDialogYes(val)
    {
        deleteCriteriaRecords({sortorder:val.name ,assignmentId:this.recordId})
        .then(result => {
            if(result == 'Success')
            {
                this.spinner = false;
                this.showToastNotification('Success','Assignment Criterias Created Successfully!!','success');
                this.closeQuickaction(event);
            }
        })
        .catch(error => {
            this.spinner = false;
            console.log('** ERROR **'+JSON.stringify(error));
        });
    }

    handleConfirmDialogNo(event)
    {
        this.showmodel = false;
    }

}