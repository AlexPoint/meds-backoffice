import {parseGenericGroups} from './src/drug-parser';

parseGenericGroups(function(drugGroups){
	console.log(drugGroups.length + " groups parsed");
})