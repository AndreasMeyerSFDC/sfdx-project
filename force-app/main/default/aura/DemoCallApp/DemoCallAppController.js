({
	handleClickMaps : function(component, event, helper) {
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": 'maps://'
        });
        urlEvent.fire();		
	},
   	handleClickSynDemo : function(component, event, helper) {
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": 'SynDemo://'
        });
        urlEvent.fire();		
	}
})