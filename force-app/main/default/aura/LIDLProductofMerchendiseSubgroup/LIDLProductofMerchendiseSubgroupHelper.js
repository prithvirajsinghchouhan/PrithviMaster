({
    fetchProducts : function(component,event) {
        var action = component.get("c.fetchProducts");
        console.log('dfdfsfs  :'+component.get("v.recordId"));
        action.setParams({ProductgroupId :component.get("v.recordId")})
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.products", response.getReturnValue());
                component.set("v.spinner",false);
                var productength = response.getReturnValue().length;
                component.set("v.previous",0);
                component.set("v.start",10);
                component.set("v.end",productength);
                console.log('cliniclength'+productength);
                if(productength > 10)
                {
                    var paginationList = [];
                    for(var i=0; i<10; i++)
                    {
                        paginationList.push(response.getReturnValue()[i]);
                    }
                    component.set("v.paginationproducts",paginationList);
                }
                else
                {
                    component.set("v.paginationproducts", response.getReturnValue());
                    component.set("v.isnextdisable",true);
                }
            }
        });
        
        $A.enqueueAction(action);
    }
})
