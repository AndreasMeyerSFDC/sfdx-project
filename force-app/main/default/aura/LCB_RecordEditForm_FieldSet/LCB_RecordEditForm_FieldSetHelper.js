({
	getFieldsetHandler: function (component, event, helper) {
		//call aura method from service component:
		console.log("getFieldsetHandler");
		component.find("service").callApex(component,
            "c.getFieldSetMember",
			{
				"objectName": component.get("v.sObjectName"),
				"fieldSetName": component.get("v.fieldsetSelected")

			},
			this.getFieldsetSuccess,
            false);
	},

	// getFieldsetSuccess pocesses the response from server and service component.
	// I have simplified this return from apex since we dont need anything fancy
	// recordForm takes a String array (fields = v.fieldsArray
	getFieldsetSuccess: function (component, returnValue) {
		//var resultArray = [];
        //resultArray.push(returnValue[i]);
  			component.set("v.fieldsArray", returnValue);
	},

	showToast: function (params) {
		var toastEvent = $A.get("e.force:showToast");
		if (toastEvent) {
			toastEvent.setParams(params);
			toastEvent.fire();
		} else {
			alert("more code here");
		}
	},
})