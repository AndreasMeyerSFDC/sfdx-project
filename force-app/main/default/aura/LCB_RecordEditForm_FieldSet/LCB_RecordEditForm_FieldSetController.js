({
    doInit: function(component, event, helper) {
        helper.getFieldsetHandler(component, event, helper);
        //var eventFields =  event.getParam("fields");
        //doneRendering(component, event, helper);
    },
    doneRendering:function(component, event, helper) {
         
        var sObjectName=component.get("v.sObjectName");
        var objectInfo = event.getParams().objectInfos;
        var eventFields =  objectInfo[sObjectName].fields;//event.getParam("fields"); 
       
        var preDefinedFieldMap=component.get("v.preDefinedFieldMap");
       if(preDefinedFieldMap !== null && !$A.util.isEmpty(preDefinedFieldMap) && !$A.util.isEmpty(eventFields)){
       	 	   Object.keys(preDefinedFieldMap).forEach(function (key) {
                   if(eventFields.hasOwnProperty(key)){
                       eventFields[key] = preDefinedFieldMap[key];		
                       	eventFields['Address_same_as_Account__c']=false;
                     }    
         //       $A.get('e.force:refreshView').fire();
			});
        }   
    },   
    onCancel: function(component, event, helper) {
        window.history.back();

    },
    getToast: function(component, event, helper) {
      
        helper.showToast({
            "title": "Record Update",
            "type": "success",
            "message": "Record Updated"
        });
    },
     redirect: function(component, event, helper) {
      
       var navEvt = $A.get("e.force:navigateToSObject");
    navEvt.setParams({
      "recordId": event.getParams().id,
      "slideDevName": "detail"
    });
    navEvt.fire();
        
        helper.showToast({
            "title": "Success",
            "type": "success",
            "message": "Record Created"
        });
    },
    onRecordSubmit: function(component, event, helper) {
        var preDefinedFieldMap=component.get("v.preDefinedFieldMap");
  var eventFields = event.getParam("fields");
         if(preDefinedFieldMap!=null && typeof preDefinedFieldMap!=='undefined'){
             event.preventDefault(); // stop form submission   
             
             Object.keys(preDefinedFieldMap).forEach(function (key) {
 				eventFields[key] = preDefinedFieldMap[key];		 
                
			});
                                        
            }
    
  component.find('recordForm').submit(eventFields);
}
})