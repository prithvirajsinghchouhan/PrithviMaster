import { LightningElement, track } from 'lwc';

export default class DynamicTableParent extends LightningElement {
@track datavar;
@track totalrows;
/*connectedCallback() {
    totalrows = 1;
    datavar = [{index:'1',fname:'',lname:'',salary:'',designation:''}];
}

    addrow()
    {
        totalrows = totalrows + 1;
        datavar.push({index:totalrows,fname:'',lname:'',salary:'',designation:''});
        /*datavar.map(function(val,i){
            val.index = i+1;
            return val;
        });*/
   /* }

    savedata(event)
    {
        var dataquery = this.template.querySelectorAll('dynamic-table-child-comp');
        console.log();
    } */
}