import { LightningElement,track } from 'lwc';
import createAccounts from '@salesforce/apex/LWCDynamicTableController.createAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DynamiTableParentComp extends LightningElement {

 @track datavar;
 @track totalrows;
connectedCallback() {
    this.totalrows = 1;
    this.datavar = [{index:'1',fname:'',lname:'',salary:'',designation:''}];
}

    addrow()
    {
        this.totalrows = this.totalrows + 1;
        this.datavar.push({index:this.totalrows,fname:'',lname:'',salary:'',designation:''});
        /*datavar.map(function(val,i){
            val.index = i+1;
            return val;
        });*/
    }

    savedata(event)
    {
        
        var finaldata = [];
        const dataquery = this.template.querySelectorAll('c-dynamic-table-child-comp');
        dataquery.forEach(element => {
            let acc = { 'sobjectType': 'Account' };
            acc.FirstName = element.allvalue.fname;
            acc.LastName = element.allvalue.lname;
            acc.Name = element.allvalue.fname + ' ' + element.allvalue.lname;
            finaldata.push(acc);
            console.log('Account :'+acc+' Acc json :'+JSON.stringify(acc));
        });
        createAccounts({
            acclst: finaldata
        })
        .then(results => {
            if(results)
            {
                const evt = new ShowToastEvent({
                    title: 'Success',
                    message: 'Records successfully created',
                    variant: 'success',
                });
                this.dispatchEvent(evt);
                console.log('in success');
            }
            else{
                const evt = new ShowToastEvent({
                    title: 'Error',
                    message: 'There is some error occured',
                    variant: 'error',
                });
                this.dispatchEvent(evt);
                console.log('in failure');
            }
        })
        .catch(error => {
            const evt = new ShowToastEvent({
                title: 'Error',
                message: 'There is some error occured',
                variant: 'error',
            });
            this.dispatchEvent(evt);
            
        })
        console.log('STRINGIFY'+JSON.stringify(dataquery));
        console.log('---dataquery---44'+dataquery.length + '  '+finaldata+'String '+JSON.stringify(finaldata));
    } 

    handleremoverow(event)
    {
        const rowno = event.detail;
        console.log('row no '+rowno);
        this.datavar.splice((rowno-1),1);
    }
}