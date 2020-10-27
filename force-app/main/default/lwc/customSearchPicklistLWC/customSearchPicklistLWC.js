import { LightningElement,api,wire,track} from 'lwc';
import fetchLookUpValues from '@salesforce/apex/CustomAssignmentRuleCntrl.getOperator';
export default class ValidateDataListComponent extends LightningElement {
@track options1 = [];
@api options = [];
@api isemailtemplate ='';
@api searchKey;
@track searchValue = '';
@track selectedAssignee;
//@track isspinner = true;
@track showAccountsListFlag = false;
@track isSelection = false;


    connectedCallback(){
        //this.template.querySelector('.spinnerclass').classList.add('slds-hide');
        if(this.isemailtemplate == 'TRUE'){this.email = true} else { this.email = false}
    }
        

    handleClick(){
        if (!this.showAccountsListFlag) {
            this.showAccountsListFlag = true;
            this.template.querySelector('.accounts_list').classList.remove('slds-hide');
            this.template.querySelector('.slds-searchIcon').classList.add('slds-hide');
            this.template.querySelector('.slds-icon-utility-down').classList.remove('slds-hide');
        }
            this.template.querySelector('.slds-dropdown-trigger').classList.add('slds-is-open');
    }

    handlekeydown(event)
    {
        window.clearTimeout(this.delayTimeout);
    }

    handleKeyUp1(event)
    {
        this.searchValue = event.target.value;
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout=setTimeout(() => {
            this.handleKeyUp(event);
        },3000);
    }

    handleKeyUp(event) {
        const filter = this.searchValue.toUpperCase();
        const span = this.template.querySelector('.slds-listbox_vertical').childNodes;
        //this.isspinner = true;
        //this.template.querySelector('.spinnerclass').classList.remove('slds-hide');
        for (let i = 0; i < span.length; i++) {
        const option = span[i].textContent;
            if (option.toUpperCase().indexOf(filter) > -1) {
                span[i].style.display = "";
            } 
            else {
            span[i].style.display = "none";
            }
        }
        //this.isspinner = false;
        //this.template.querySelector('.spinnerclass').classList.add('slds-hide');
        //this.searchValue = this.searchValue;
        if (this.searchValue === ''){
            this.template.querySelector('.accounts_list').classList.add('slds-hide');
            this.template.querySelector('.slds-searchIcon').classList.remove('slds-hide');
            this.template.querySelector('.slds-icon-utility-down').classList.add('slds-hide');
            this.showAccountsListFlag = false;
        }
        else{
            this.template.querySelector('.accounts_list').classList.remove('slds-hide');
            this.template.querySelector('.slds-searchIcon').classList.add('slds-hide');
            this.template.querySelector('.slds-icon-utility-down').classList.remove('slds-hide');
            this.showAccountsListFlag = true;
        }
    }
    handleOptionSelect(event) {
        this.selectedAssignee = event.currentTarget.dataset.id;
        if(!this.isSelection){
            this.isSelection = true;
        }
        console.log('email selected'+this.isemailtemplate);
        this.template.querySelector('.selectedOption').classList.remove('slds-hide');
        this.template.querySelector('.accounts_list').classList.add('slds-hide');
        this.template.querySelector('.defaultClass').classList.add('slds-hide');
        const selectedEvent = new CustomEvent("valuechange", {
            detail: {val:event.currentTarget.dataset.name,isemail: this.isemailtemplate,name: this.selectedAssignee}
          });
        this.dispatchEvent(selectedEvent);
    }
    handleRemoveSelectedOption(event) {
        this.template.querySelector('.selectedOption').classList.add('slds-hide');
        this.template.querySelector('.slds-searchIcon').classList.remove('slds-hide');
        this.template.querySelector('.slds-icon-utility-down').classList.add('slds-hide');
        this.template.querySelector('.defaultClass').classList.remove('slds-hide');

        console.log('not selected'+this.isemailtemplate);
        this.template.querySelector('.searchvalue').value = '';
        this.searchKey = '';
        this.showAccountsListFlag = false;
        this.selectedAssignee = '';
        const selectedEvent = new CustomEvent("valuechange", {
            detail: {val:'',isemail: this.isemailtemplate,name: this.selectedAssignee}
          });
        this.dispatchEvent(selectedEvent);
    }

    handleBlur(event)
    {
        this.template.querySelector('.accounts_list').classList.add('slds-hide');
        this.template.querySelector('.slds-searchIcon').classList.remove('slds-hide');
        this.template.querySelector('.slds-icon-utility-down').classList.add('slds-hide');
        this.showAccountsListFlag = false;
    }

    @api handletypechange()
    {
        this.handleRemoveSelectedOption();
    }

}