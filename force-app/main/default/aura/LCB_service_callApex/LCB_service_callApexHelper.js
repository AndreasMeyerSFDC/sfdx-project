({
// service_callApex helper 
	callApex: function(component, controllerMethod, actionParameters, successCallback) {
        // create a one-time use instance of the serverEcho action
        // in the server-side controller
        console.log("callApex controllerMethod: " + controllerMethod);
        console.log("callApex actionParameters: " + actionParameters);
           var action = component.get(controllerMethod);
           action.setParams(actionParameters);
        
        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
        
                //->HERE WE CALL THE CALLBACK RATHER Than PROCESS THE RESPONSE
                successCallback(component, response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        
        // optionally set storable, abortable, background flag here
        // A client-side action could cause multiple events, 
        // which could trigger other events and 
        // other server-side action calls.
        
        // $A.enqueueAction adds the server-side action to the queue.
        $A.enqueueAction(action);
    },      
})