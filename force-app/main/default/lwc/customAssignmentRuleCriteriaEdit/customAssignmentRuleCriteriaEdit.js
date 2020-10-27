import { api, LightningElement, track, wire} from 'lwc';
import getAllFields from '@salesforce/apex/CustomAssignmentRuleCntrl.getFieldList';
import getOperator from '@salesforce/apex/CustomAssignmentRuleCntrl.getOperator';
import getUserrecords from '@salesforce/apex/CustomAssignmentRuleCntrl.getuserdetails';
import getQueuerecords from '@salesforce/apex/CustomAssignmentRuleCntrl.getQueuedetails';
import getAllemailtemplates from '@salesforce/apex/CustomAssignmentRuleCntrl.getAllEmailTemplates';
import OrderCheck from '@salesforce/apex/CustomAssignmentRuleCntrl.OrderCheck'; 
import getAssignmentCritera from '@salesforce/apex/CustomAssignmentRuleCntrl.getAssignmentCriteriarecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import OPERATOR_FIELD from '@salesforce/schema/Assignment_Rule_Criteria__c.Operator__c';
import { NavigationMixin } from 'lightning/navigation';

export default class CustomAssignmentRuleCriteriaEdit extends LightningElement {

    @api recordId;
    @track fieldlist;
    @track totalrule = 1;
    @track operatorvalues;
    @track email = 'TRUE';
    @track noemail = 'FALSE';
    @track showlogic = false;
    @track rulelist = [{rowcount:1 ,field:'',operator:'',value:''}];
    @track assignoptions = [{label:'User',value:'User'},{label:'Queue',value:'Queue'}];
    @track assigndefault = 'User';
    @track assigneevalue;
    @track assigneename; 
    @track emailtemplateID;
    @track emailtemplateName;
    @track spinner = false;
    @track queuemap = [];
    @track usersmap = [];
    @track emailtemplate = [];
    @track dataforchild = [];

    @api sortorderedit ='';
    @api assignmentId;

    @wire(getOperator)
    allPicklistValues({ error, data }) {
        if(data){
            console.log('JSON pick'+JSON.stringify(data) +'sortorderedit : '+this.sortorderedit);
            this.operatorvalues = data.map(opvalue => {
                return {
                    label: opvalue.split('-')[0],
                    value: opvalue.split('-')[1]
                };
            });
            console.log('JSON pick1 '+JSON.stringify(this.operatorvalues));
        }
        else{
            console.log('JSON pick error'+JSON.stringify(error));
        }
    } 

    @wire(getUserrecords)
    allusers({error,data})
    {
        if(data){
            data.forEach(element => {
                this.usersmap.push({key : element.Name,value: element.Id});
            });
            this.dataforchild = this.usersmap;
            console.log('JSON user data111 '+JSON.stringify(this.dataforchild));
        }
        else{
            console.log('JSON user data111 error'+JSON.stringify(error));
        }
    }

    @wire(getQueuerecords)
    allqueues({error,data})
    {
        if(data){
            data.forEach(element => {
                this.queuemap.push({key : element.Name,value: element.Id});
            });
            console.log('JSON queues data'+JSON.stringify(this.queuemap));
        }
        else{
            console.log('JSON queues data error'+JSON.stringify(error));
        }
    }

    @wire(getAllemailtemplates)
    allemailtemplates({error,data})
    {
        if(data){
            data.forEach(element => {
                this.emailtemplate.push({key : element.Name,value: element.Id});
            });
        }
        else{
            console.log('JSON Template data error'+JSON.stringify(error));
        }
    }

    @wire(getAllFields,{assignmentid:'$recordId'})
    allFields({ error, data }) {
        if(data){
            console.log('JSON data field'+JSON.stringify(data));
            this.fieldlist = data.map(obj => {
                return {
                    label: obj.split('-')[1],
                    value: obj
                };
            });
            console.log('JSON data field1'+JSON.stringify(this.fieldlist));
        }
        else{
            console.log('JSON error field'+JSON.stringify(error));
        }
    }


    @wire(getAssignmentCritera,{sortorder: this.sortorderedit,assignmentId:'$recordId'})
    getallassignmentrecords({ error, data }) {
        if(data){
            console.log('JSON data new field 23456'+JSON.stringify(data));
            this.rulelist = data.map(obj => {
                return {
                    rowcount: obj.Filter_Sequence__c,
                    field: obj.Field_Name__c,
                    operator: obj.Operator__c,
                    value: obj.Value__c
                };
            });
            console.log('JSON data  new field1'+JSON.stringify(this.fieldlist));
        }
        else{
            console.log('JSON error new field 9876'+JSON.stringify(error));
        }
    }

    handleChange(event)
    {
        var evt = event.target;
        if(evt.name == 'field')
        {
            this.rulelist[evt.dataset.id].field = evt.value.split('-')[0];
        }
        else if(evt.name == 'operator')
        {
            this.rulelist[evt.dataset.id].operator = evt.value;
        }
        else if(evt.name == 'rulevalue')
        {
            this.rulelist[evt.dataset.id].value = evt.value;
        }
    }

    handleAssigneeChange(event)
    {
        let assigninp = this.template.querySelector(".assignee");
        if(assigninp.value == 'User')
        {
            this.dataforchild = this.usersmap;
        }
        else if(assigninp.value == 'Queue')
        {
            this.dataforchild = this.queuemap;
        }
        this.template.querySelector("c-custom-search-picklist-l-w-c").handletypechange();
    }

    addrows(event)
    {
        this.totalrule++;
        this.rulelist.push({rowcount:this.totalrule,field:'',operator:'',value:''});
    }

    deleterows(event)
    {
        if(this.totalrule == 1)
        {
            this.showToastNotification('Error','Should have atlease 1 filter criteria','error');
        }
        else{
            this.totalrule--;
            this.rulelist.pop();
        }
    }

    closeQuickaction(event) {
        const closeQA = new CustomEvent('closequick');
        this.dispatchEvent(closeQA);
    }

    handlecustompicklist(event)
    {
        var det = event.detail;
        if(det.isemail =='TRUE')
        {
            this.emailtemplateID = det.val;
            this.emailtemplateName = det.name;
            console.log('Email template');
        }
        else{
            this.assigneevalue = det.val;
            this.assigneename = det.name;
            console.log('testing '+this.assigneevalue); 
        }     
    }

    createAssigmentCriteria(event)
    {
        let sortinp = this.template.querySelector(".sortfield");
        let assigneetypeinp = this.template.querySelector(".assignee");
        let filterinp = this.template.querySelector(".filterinput");
        var defaultfilter = '';

        if(sortinp.value == null || sortinp.value == undefined || sortinp.value == '')
        {
            this.showToastNotification('Error','Please fill the Sort Order!','error');
            return;
        }
        else{
            if(this.assigneevalue == undefined || this.assigneevalue == '')
            {
                this.showToastNotification('Error','Please select the Assignee!','error');
                return;
            }
            OrderCheck({sortorder:sortinp.value ,assignmentId:this.recordId})
            .then(result => {
                if(result)
                {
                    this.spinner = false;
                    this.showToastNotification('error','The Sort Order is already in the System','error');
                }
                else{

                    if(filterinp == undefined || filterinp == null)
                    {
                        for(var i=1;i<=this.totalrule;i++)
                        {
                            if(i==1)
                            {
                                defaultfilter = '('+i.toString();
                            }
                            else{
                            defaultfilter = defaultfilter + ' AND '+i.toString();
                        }                        
                            if(i== this.totalrule)
                            {
                                defaultfilter = defaultfilter + ')';
                            }
                        }
                    }
                    var finalarray = [];   
                    for(var i=0;i<this.totalrule;i++)
                    {
                        var rule = this.rulelist[i];
                        if(rule.field == ''|| rule.field== undefined || rule.field == null ||
                        rule.operator == '' || rule.operator == undefined || rule.operator == null)
                        {
                            this.showToastNotification('Error','Field or Operator are not selected','error');
                            return;
                        }
                        else{
                            var data = {'sobjectType' : 'Assignment_Rule_Criteria__c'};
                                data['Assignment_Rule__c'] = this.recordId;
                                data['Field_Name__c'] = rule.field;
                                data['Operator__c'] = rule.operator;
                                data['Value__c'] = rule.value;
                                data['Sort_Order__c'] = sortinp.value;
                                data['Assignee_Type__c'] = assigneetypeinp.value;
                                data['Assignee_Id__c'] = this.assigneevalue;
                                data['Assignee_Name__c'] = this.assigneename;
                                data['Email_Template_Id__c'] = this.emailtemplateID;
                                data['Filter_Sequence__c'] = rule.rowcount.toString();
                                if(filterinp != undefined || filterinp != null)
                                {
                                    data['Filter_Logic__c'] = filterinp.value;
                                }
                                else{
                                    data['Filter_Logic__c'] = defaultfilter;
                                }
                                finalarray.push(data);
                    }
                }
                console.log('dfhdfhdf'+JSON.stringify(finalarray));
                    this.spinner = true;
                createAssignmentCritera({assignmentcriterialst: finalarray})
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
            })
            .catch(error => {
                this.spinner = false;
                console.log('** ERROR **'+JSON.stringify(error));
            });
        }
        
    }

    handlelogicclick(event)
    {
        var evt = event.target;
        if(evt.name == 'addlink')
        {
            this.showlogic = true;
        }
        else if(evt.name == 'removelink')
        {
            this.showlogic = false;
        }
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