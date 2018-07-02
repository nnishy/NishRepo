dojo.provide("com.acn.adt.scripts.validators.DateValidator");

dojo.require("com.ibm.team.workitem.api.common.Severity");
dojo.require("com.ibm.team.workitem.api.common.Status");
dojo.require("dojo.date"); // We need the date class from Dojo to compare two dates
dojo.require("dojo.date.stamp"); // We need the stamp class to work with ISO date strings

(function() {
var Severity = com.ibm.team.workitem.api.common.Severity;
var Status = com.ibm.team.workitem.api.common.Status;

var DateValidator = dojo.declare("com.acn.adt.scripts.validators.DateValidator", null, {

    validate: function(attributeId, workItem, configuration) {
    
        // Get the configuration parameters about the severity and error message of this validator
        var severity= configuration.getChild("parameters").getStringDefault("severity", Severity.ERROR.name);
        var message= configuration.getChild("parameters").getStringDefault("message", "");
        
        // Get the begin date attribute from the configuration and make a Date object from it
        var beginDateId = configuration.getChild("parameters").getStringDefault("beginDateAttributeId", "");
        var beginDate = dojo.date.stamp.fromISOString(workItem.getValue(beginDateId));
        
        // Get the current attribute's value and make a Date object from it
        var endDate= dojo.date.stamp.fromISOString(workItem.getValue(attributeId));
        if(!(endDate == null) && !(beginDate == null)){
        // Compare the two dates and make sure endDate is not earlier than beginDate
        if (dojo.date.compare(endDate, beginDate) >= 0) {
            return Status.OK_STATUS;
        } else {
            return new Status(Severity[severity], message);
        }
	}else {
return Status.OK_STATUS;

}
    }
});
})();