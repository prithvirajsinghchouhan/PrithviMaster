({
    doInit : function(component, event, helper) {
        component.set("v.spinner",true);
        component.set("v.ispreviousdisable",true);
        helper.fetchProducts(component,event);
    },

    NextPage : function(component, event) {
        var stval = component.get("v.start");
        var endval = component.get("v.end");
        var previousval = component.get("v.previous");
        var diffval = endval - stval;
        
        var productlst = component.get("v.products");
        if(diffval>10)
        {
            var paginationList = [];
            for(var i=stval; i<stval+10; i++)
            {
                paginationList.push(productlst[i]);
            }
            //component.set("v.previous",stval);
            //component.set("v.start",stval+10);
            component.set("v.isnextdisable",false);
            component.set("v.ispreviousdisable",false);
            component.set("v.paginationproducts",paginationList);
        }
        else
        {
            var paginationList = [];
            for(var i=stval; i<endval; i++)
            {
                paginationList.push(productlst[i]);
            }
            //component.set("v.previous",stval);
            //component.set("v.previous",stval);
            //component.set("v.start",stval+10);
            component.set("v.ispreviousdisable",false);
            component.set("v.paginationproducts",paginationList);
            component.set("v.isnextdisable",true);
        }
        component.set("v.previous",stval);
        component.set("v.start",stval+10);
        
    },
    PreviousPage : function(component, event) {
        var stval = component.get("v.start");
        var endval = component.get("v.end");
        var previousval = component.get("v.previous");
        var diffval = endval - stval;
        var productlst = component.get("v.products");
        
        var paginationList = [];
      
            for(var i=previousval-10; i<previousval; i++)
            {
                paginationList.push(productlst[i]);
            }
            component.set("v.start",stval-10);
            
       
        if(previousval-10 === 0)
        {
            component.set("v.ispreviousdisable",true);
        }
        else
        {
            component.set("v.previous",previousval-10);
        }
            component.set("v.isnextdisable",false);
        
        component.set("v.paginationproducts",paginationList);
    },
    RedirectDetailPage : function(component, event, helper) {
        var target = event.getSource();
        var txtVal = target.get("v.value");

        var navService = component.find("navService");
        console.log('dfjfsdfsj :'+txtVal);
        var pageReference = {
            type: 'standard__recordPage',
            attributes: {
                recordId: txtVal,
                actionName: 'view'
            }
        };
        navService.navigate(pageReference);
        /*var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/agn-icl-detailpage?lcid="+txtVal
        });
        urlEvent.fire();*/
    }
})
