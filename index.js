import * as drugParser from './src/drug-parser';

drugParser.parseGenericGroups(function(drugGroups){
	console.log(drugGroups.length + " groups parsed");
	console.log(drugGroups[0])
})

drugParser.parseDrugs(function(drugs){
	console.log(drugs.length + " drugs parsed");
	console.log(drugs[0]);
})

drugParser.parseCompositions(function(compositions){
	console.log(compositions.length + " compositions parsed");
	console.log(compositions[0]);
})

drugParser.parsePresentations(function(presentations){
	console.log(presentations.length + " presentations parsed");
	console.log(presentations[0]);
})