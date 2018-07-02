dojo.provide("com.acn.adt.workitem.validation.CRCRAssignedValidator");

dojo.require("com.ibm.team.workitem.api.common.Severity");
dojo.require("com.ibm.team.workitem.api.common.Status");
dojo.require("dojo.date"); // We need the date class from Dojo to compare two dates
dojo.require("dojo.date.stamp"); // We need the stamp class to work with ISO date strings

(function() {
var Severity = com.ibm.team.workitem.api.common.Severity;
var Status = com.ibm.team.workitem.api.common.Status;

var DateValidator = dojo.declare("com.acn.adt.workitem.validation.CRCRAssignedValidator", null, {

	validate: function(attributeId, workItem, configuration) {
				
		var crAssigned = dojo.date.stamp.fromISOString(workItem.getValue("com.acn.adt.attribute.changerequest.crassigned"));
		var plannedCRAssignment = dojo.date.stamp.fromISOString(workItem.getValue("com.acn.adt.attribute.changerequest.plannedcrassignment"));
		
		if(crAssigned == null && plannedCRAssignment != null){
		
			var today = new Date();
			
			var differenceFromToday = dojo.date.difference(plannedCRAssignment, dojo.date.stamp.fromISOString(today), "day");
			
			if(differenceFromToday == 0) {
				return Status.OK_STATUS;
			}
			else if (dojo.date.compare(today, plannedCRAssignment) > 0) {
				return new Status(Severity["ERROR"], "Planned CR Assignment date has been surpassed.  Either review Planned CR Assignment date or set CR Assigned date");
			}
		}
		else {
		
			var crPlanned = dojo.date.stamp.fromISOString(workItem.getValue("com.acn.adt.attribute.changerequest.crplanned"));
			var dayDifference = dojo.date.difference(crAssigned, crPlanned, "day");
			
			if(crPlanned == null || crAssigned == null) {
				return Status.OK_STATUS;
			}
			else if(dayDifference == 0) {
				return Status.OK_STATUS;
			}
			else if (dojo.date.compare(crAssigned, crPlanned) >= 0) {
				return Status.OK_STATUS;
			}
			else {
				return new Status(Severity["ERROR"], "CR Assigned date cannot be before CR Planned date");
			}
		
		}
	}
});
})();