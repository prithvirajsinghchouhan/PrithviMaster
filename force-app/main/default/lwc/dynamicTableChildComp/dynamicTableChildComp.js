import { LightningElement, track,api } from 'lwc';

export default class DynamicTableChildComp extends LightningElement {
    @api srno;
    @api listdata;
    @track fname;
    @track lname;
    @track salary;
    @track designationval;
    @api allvalue = {index:this.srno,fname:'',lname:'',salary:'',designation:''};
    
    get options() {
        return [
            { label: 'Program Analyst', value: 'Program Analyst' },
            { label: 'Associate', value: 'Associate' },
            { label: 'Senior Associate', value: 'Senior Associate' },
            { label: 'Consultant', value: 'Consultant' },
            { label: 'Senior Consultant', value: 'Senior Consultant' },
        ];
    }

    handlePicklistChange(event)
    {
        //this.allvalue[0].designation = event.detail.value;
        this.allvalue.designation = event.detail.value;
        console.log('this.allvalue'+JSON.stringify(this.allvalue));
        console.log('designationvaldfdd     '+event.detail.value + '    json designationval'+JSON.stringify(event.detail.value));
    }

    handlevalueschange(event)
    {
        var inpval = event.target.value;
        var targetid = event.target.dataset.id;

        if(targetid =='fname')
        {
            this.allvalue.fname = inpval;
        }
        else if(targetid == 'lname')
        {
            this.allvalue.lname = inpval;
        }
        else if(targetid == 'salary')
        {
            this.allvalue.salary = inpval;
        }
        else if(targetid == 'designation')
        {
            this.allvalue.designation = inpval;
        }
        console.log('allvalue string'+JSON.stringify(this.allvalue));
    }

    remove(event)
    {
        const selectEvent = new CustomEvent('removerow', {
            detail: this.srno
        });
       this.dispatchEvent(selectEvent);
    }
}