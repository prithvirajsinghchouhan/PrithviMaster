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
    @track spinner = false;

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
        //handleConfirmDialogYes(val);
        
    }

    handleConfirmDialogYes(val)
    {
        deleteCriteriaRecords({sortorder:val.name ,assignmentId:this.recordId})
        .then(result => {
            if(result)
            {
                this.showToastNotification('SUCCESS','Assignment Criteria deleted!','error');
                getAllCriteriaRecords({assignmentId:'$recordId'})
                .then(result => {
                    
                        this.allcriteriarecords = result;
                })
                .catch(error => {
                    console.log('** ERROR **'+JSON.stringify(error));
                });
            }
        })
        .catch(error => {
            console.log('** ERROR **'+JSON.stringify(error));
        });
    }

    handleConfirmDialogNo(event)
    {
        this.showmodel = false;
    }

    showToastNotification(title,message,variant)
    {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(evt);
    }

}