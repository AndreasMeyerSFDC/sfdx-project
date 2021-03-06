({
    triggerMerge : function(component,event,helper) {
        console.log('triggerMerge: START');
        
        let methodArg = event.getParam('arguments');
        console.log('mergeTemplate: methodArg fetched',JSON.stringify(methodArg));
        
        if (! methodArg.callback) {
            console.error('mergeTemplate: missing callback arguments',JSON.stringify(methodArg));
            component.find('notifLib').showNotice({
              "variant": "error",
              "header" : "Missing argument for merge !",
              "message": "Callback parameter is missing in triggerMerge() method."
            });
            return;
        }
        
        if (! methodArg.template) {
            console.error('mergeTemplate: missing template arguments',JSON.stringify(methodArg));
            methodArg.callback(null,[{"message":"Template parameter is missing in triggerMerge() method."}]);
            return;
        }
        
        helper.mergeTemplate(methodArg.template,
                             methodArg.row,
                             methodArg.callback,
                             component,helper);
        console.log('triggerMerge: END');
    },
    
    triggerUserMerge : function(component, event, helper) {
        console.log('triggerUserMerge: START');
        helper.mergeUserFields(component, event, helper);
        console.log('triggerUserMerge: END');
    },
    
    triggerObjectMerge : function(component, event, helper) {
        console.log('triggerObjectMerge: START');
        helper.mergeObjectFields(component, event, helper);
        console.log('triggerObjectMerge: END');
    },
    
    triggerAction : function(component, event, helper) {
        console.log('triggerAction: START');
        
        let methodArg = event.getParam('arguments');
        console.log('triggerAction: methodArg from event',JSON.stringify(methodArg));
       
        if (! methodArg.action) {
            console.error('mergeTemplate: missing action arguments',JSON.stringify(methodArg));
            methodArg.callback(null,[{"message":"Action parameter is missing in triggerAction() method."}]);
            return;
        }
        
        helper.mergeAction(methodArg.action,
                           methodArg.row,
                           methodArg.callback,
                           component, helper);
        console.log('triggerAction: END');
    }
    /*,
    // WORK IN PROGRESS
    handleCallback : function(component,event,helper) {
        console.log('handleCallback: START');
        
        let channel = event.getParam('channel');
        console.log('handleCallback: event channel received',channel);
		
        let message = event.getParam('message');
        console.log('handleCallback: event message received',JSON.stringify(message));
        
        let cmpId = component.getGlobalId();
        console.log('handleCallback: cmpId',cmpId);
        
        if (   (channel === 'PEG_Callback')
            && (message.sourceId === cmpId)) {
            console.warn('handleCallback: callback OK');
            $A.get('e.force:refreshView').fire();
            console.warn('handleCallback: refreshed');
        } else {
            console.warn('handleCallback: callback ignored');
        }
        
        
        console.log('handleCallback: END');
    }*/
})