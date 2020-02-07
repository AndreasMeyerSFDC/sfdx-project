({
    handleRecordUpdated: function(component, event, helper) {
        var eventParams = event.getParams();
        var currentContact = component.get("v.contactRecord");
       	var mapContainerMailing = component.find('mapContainerMailing');
        
       	var mapContainerOther = component.find('mapContainerOther');
         
        var zoomMailing = component.get("v.zoomFactorMailingLink");
        var zoomOther = component.get("v.zoomFactorOtherLink");  
        var showGoogleLinks = component.get("v.showGoogleLinks");   
        var showMailingAddress = component.get("v.showMailingAddress");
        var showOtherAddress = component.get("v.showOtherAddress");
        if(eventParams.changeType === "LOADED") {  
            console.log("account loaded:::::" + currentContact);
            var resultArray = [];
            if (showMailingAddress) resultArray.push("MailingAddress");
            if (showOtherAddress) resultArray.push("OtherAddress");
            component.set("v.recordFormFields", resultArray);

            var showContactAddress = false;
            let locationContactMap = {};
            var showOtherAddressIntern = false;
            let locationOtherMap = {};            

            if (currentContact.MailingCity != null || (currentContact.MailingLatitude != null &&  currentContact.MailingLongitude != null) ){
                showContactAddress = true;
                // populate location for :
                if (currentContact.MailingCity != null)
                    locationContactMap['City'] = currentContact.MailingCity;
                if (currentContact.MailingStreet != null)
                    locationContactMap['Street'] = currentContact.MailingStreet;
                if (currentContact.MailingState != null)
                    locationContactMap['State'] = currentContact.MailingState;
                if (currentContact.MailingPostalCode != null)
                    locationContactMap['PostalCode'] = currentContact.MailingPostalCode;

                if (currentContact.MailingLatitude != null && currentContact.MailingLatitude != "")
                    locationContactMap['Latitude'] = currentContact.MailingLatitude;
                if (currentContact.MailingLongitude != null && currentContact.MailingLongitude != "")
                    locationContactMap['Longitude'] = currentContact.MailingLongitude;  
                
            }    

            
            if (currentContact.OtherCity != null || (currentContact.OtherLatitude != null &&  currentContact.OtherLongitude != null) ){
                showOtherAddressIntern = true;
                // populate location for :
                if (currentContact.OtherCity != null)
                    locationOtherMap['City'] = currentContact.OtherCity;
                if (currentContact.OtherStreet != null)
                    locationOtherMap['Street'] = currentContact.OtherStreet;
                if (currentContact.OtherState != null)
                    locationOtherMap['State'] = currentContact.OtherState;
                if (currentContact.OtherPostalCode != null)
                    locationOtherMap['PostalCode'] = currentContact.OtherPostalCode;

                if (currentContact.OtherLatitude != null && currentContact.OtherLatitude != "")
                    locationOtherMap['Latitude'] = currentContact.OtherLatitude;
                if (currentContact.OtherLongitude != null && currentContact.OtherLongitude != "")
                    locationOtherMap['Longitude'] = currentContact.OtherLongitude;  
                
            }   

            if (true == showContactAddress ){

            	$A.createComponent(
                "lightning:map",
                {
                    //passing attribute values to dynamic map component
                    "aura:id" : 'mapComponentMailing',//aura:id of dynamic map component
                    "mapMarkers" : [
                                    {
                                        location: locationContactMap,                                       
                                        title: currentContact.Name,
                                        description: currentContact.MailingAddress
                                    }
                                ],
                    "zoomLevel" : zoomMailing,
                    "title": currentContact.Name,
                    "showFooter" : 'false'
                },
                function(lightningMap){  
                        //Adding map component body to div element
                        var mapBodyMailing = mapContainerMailing.get("v.body");  
                        mapBodyMailing.push(lightningMap);
                        mapContainerMailing.set("v.body", mapBodyMailing); 
                });
                
                if (true == showGoogleLinks){
                    component.set("v.showMailingLink",true);
                }
                    
                
            }
            if (showOtherAddressIntern && showOtherAddress){
            	$A.createComponent(
                "lightning:map",
                {
                    //passing attribute values to dynamic map component
                    "aura:id" : 'mapComponentOther',//aura:id of dynamic map component
                    "mapMarkers" : [
                                    {
                                        location: locationOtherMap,                                     
                                        title: currentContact.Name,
                                        description: currentContact.OtherAddress
                                    }
                                ],
                    "zoomLevel" : zoomOther,
                    "title": currentContact.Name,
                    "showFooter" : 'false'
                },
                function(lightningMap){  
                        //Adding map component body to div element
                        var mapBodyOther = mapContainerOther.get("v.body");  
                        mapBodyOther.push(lightningMap);
                        mapContainerOther.set("v.body", mapBodyOther); 
                });  
                
                if (true == showGoogleLinks){
                    component.set("v.showOtherLink",true);
                }               
            }
            
     
            
        } else if(eventParams.changeType === "ERROR") {
            // there’s an error while loading, saving or deleting the record
            component.set("v.recordLoadError",eventParams.error);
        }
    },
    navigateToGoogleMailing : function(component, event, helper) {
        var currentContact = component.get("v.accountRecord");
        // https://www.google.com/maps/place/J%C3%A4gerstra%C3%9Fe+11,+72813+St.+Johann/@48.4407083,9.3707887,17z/data=!3m1!4b1!4m5!3m4!1s0x47998c217ce4162d:0xf24512b58fd24fcc!8m2!3d48.4407083!4d9.3729774
        var googleURL = "https://www.google.com/maps/?q="
        	+ encodeURIComponent(currentContact.MailingStreet)
        	+ "," + encodeURIComponent(currentContact.MailingPostalCode)+ " " + encodeURIComponent(currentContact.MailingCity);
        	+ "/" + encodeURIComponent(currentContact.MailingLatitude )+ "," + encodeURIComponent(currentContact.MailingLongitude);
		window.open(googleURL);
	},
    navigateToGoogleOther : function(component, event, helper) {
        var currentContact = component.get("v.accountRecord");
        // https://www.google.com/maps/place/J%C3%A4gerstra%C3%9Fe+11,+72813+St.+Johann/@48.4407083,9.3707887,17z/data=!3m1!4b1!4m5!3m4!1s0x47998c217ce4162d:0xf24512b58fd24fcc!8m2!3d48.4407083!4d9.3729774
        var googleURL = "https://www.google.com/maps/?q="
        	+ encodeURIComponent(currentContact.OtherStreet)
        	+ "," + encodeURIComponent(currentContact.OtherPostalCode)+ " " + encodeURIComponent(currentContact.OtherCity);
        	+ "/" + encodeURIComponent(currentContact.OtherLatitude )+ "," + encodeURIComponent(currentContact.OtherLongitude);
		window.open(googleURL);
	}
       
})