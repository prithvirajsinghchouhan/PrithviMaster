import { LightningElement,wire,api, track } from 'lwc';
import getAllObjects from '@salesforce/apex/CustomAssignmentRuleCntrl.getAllObjects';
import createAssignment from '@salesforce/apex/CustomAssignmentRuleCntrl.createAssignment';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class CustomAssignmentRuleLWC extends NavigationMixin(LightningElement) {

    allSobjectList;
    errormsg;
    rulename;
    @track loaded = false;
    @track selectedobject;
    @track assignmentrecord = {'sobjectType' : 'Assignment_Rule__c'};

    @wire(getAllObjects)
        allsobjectObject({ error, data }) {
            if(data){
                //console.log('JSON data'+JSON.stringify(data));
                this.allSobjectList = data.map(obj => {
                    return {
                        label: obj.split('-')[1],
                        value: obj
                    };
                });
                this.loaded = true;
                //console.log('JSON data'+JSON.stringify(this.allSobjectList));
                this.errormsg = undefined;
            }
            else{
                console.log('JSON data'+JSON.stringify(error));
                this.allSobjectList =undefined;
                this.errormsg='Failed to Load Objects.'
            }
    }

    handleChange(event)
    {
        this.selectedobject = event.target.value;
    }

    createAssigmentRule(event)
    {
        var inp = this.template.querySelector("lightning-input");
        this.assignmentrecord['Object_API_Name__c'] = this.selectedobject.split('-')[0];
        this.assignmentrecord['Object_Label__c'] = this.selectedobject.split('-')[1];
        this.assignmentrecord['Name'] = inp.value;
        createAssignment({assignmentrecord : this.assignmentrecord})
        .then(result => {
            if(result.split('-')[0] == 'Success')
            {
                this.showToastNotification('Success','Assignment rule Successfully created','success');
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: result.split('-')[1],
                        objectApiName: 'Assignment_Rule__c',
                        actionName: 'view',
                    },
                });
            }
            else{
                this.showToastNotification('Error', result,'error');
            }
        })
        .catch(error => {
            console.log('** ERROR **'+JSON.stringify(error));
        });
    }

    resetValues(event)
    {
        this.navigateToAssignmentTab(event);
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

    navigateToAssignmentTab(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Assignment_Rule__c',
                actionName: 'home',
            },
        });
    }
}