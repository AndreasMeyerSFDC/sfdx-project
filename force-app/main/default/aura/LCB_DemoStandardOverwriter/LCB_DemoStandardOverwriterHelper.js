({
	handleOverwrite: function(component, event, name)  {
		var device = $A.get("$Browser.formFactor");	
        alert("You are using a " + device + " .. and you are not allowed to edit on a mobile device my friend!!");
	}
})