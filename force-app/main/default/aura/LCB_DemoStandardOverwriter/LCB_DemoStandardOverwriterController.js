({
	doInit : function(component, event, helper) {
        console.log( 'LCB_DemoStandardOverwriter doInit');
        helper.handleOverwrite(component, event, helper);      
    },
    
    onPageReferenceChanged : function(component, event, helper) {
        console.log( 'LCB_DemoStandardOverwriter onPageReferenceChanged');
        helper.handleOverwrite(component, event, helper);
    }
})