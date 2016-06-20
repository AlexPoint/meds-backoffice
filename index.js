import _ from 'underscore';
import * as drugParser from './src/drug-parser';
import * as drugGroupBuilder from './src/drug-groups-builder';

drugParser.parseGenericGroups(function(genericGroups){
	drugParser.parseDrugs(function(drugs){
		drugParser.parseCompositions(function(compositions){
			drugParser.parsePresentations(function(presentations){

				var groups = drugGroupBuilder.buildGroups(genericGroups, drugs, compositions, presentations);

				console.log(groups.length  + " groups found");
				console.log(JSON.stringify(groups[0], null, 2));
			})
		})
	})
})

/*
drugParser.parseGenericGroups(function(drugGroups){
	console.log(drugGroups.length + " groups parsed");
	console.log(drugGroups[0])
})

drugParser.parseDrugs(function(drugs){
	console.log(drugs.length + " drugs parsed");
	console.log(drugs[0]);

	// var formValues = _.chain(drugs).pluck('form').uniq();
	// console.log("Distinct form values: " + formValues);

	// var adminRoutValues = _.chain(drugs).pluck('adminRoute').uniq();
	// console.log("Distinct admin route values: " + adminRoutValues);
	
	// var authStatusValues = _.chain(drugs).pluck('authStatus').uniq();
	// console.log("Distinct auth status values: " + authStatusValues);

	// var authTypeValues = _.chain(drugs).pluck('authType').uniq();
	// console.log("Distinct auth type values: " + authTypeValues);

	// var marketStateValues = _.chain(drugs).pluck('marketState').uniq();
	// console.log("Distinct market state values: " + marketStateValues);
})

drugParser.parseCompositions(function(compositions){
	console.log(compositions.length + " compositions parsed");
	console.log(compositions[0]);

	// var statusValues = _.chain(compositions).pluck('status').uniq();
	// console.log("Distinct status values: " + statusValues);

	// var marketStateValues = _.chain(compositions).pluck('marketState').uniq();
	// console.log("Distinct market state values: " + marketStateValues);
})

drugParser.parsePresentations(function(presentations){
	console.log(presentations.length + " presentations parsed");
	console.log(presentations[0]);

	// var activeSubstanceToTherapeuticActionsValues = _.chain(presentations).pluck('activeSubstanceToTherapeuticActions').uniq();
	// console.log("Distinct activeSubstanceToTherapeuticActions values: " + activeSubstanceToTherapeuticActionsValues);
})
*/