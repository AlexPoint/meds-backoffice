import * as drugParser from './src/drug-parser';

drugParser.parseGenericGroups(function(drugGroups){
	console.log(drugGroups.length + " groups parsed");
	console.log(drugGroups[0])
})

drugParser.parseDrugs(function(drugs){
	console.log(drugs.length + " drugs parsed");
	console.log(drugs[0]);
})