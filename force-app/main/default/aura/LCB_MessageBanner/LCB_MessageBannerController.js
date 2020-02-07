({
	doInit  : function(component, event, helper) {
		var state = component.get("v.state");
        var icon = component.find("messageicon");
        var wrapper = component.find("messagewrapper");
        var iconref = "utility:warning";
        var wrapperclass = "slds-theme_warning"
        if ("success" == state){
        	iconref = "utility:success"; 
            wrapperclass = "slds-theme_success";
        }
        else if ("warning" == state){
            iconref = "utility:warning"; 
            wrapperclass = "slds-theme_warning";
        }
        else if ("error" == state){
            iconref = "utility:error"; 
            wrapperclass = "slds-theme_error";
        }
        icon.set("v.iconName",iconref);
        $A.util.addClass(wrapper, wrapperclass);

	}
})