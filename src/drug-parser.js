import fs from 'fs';
import csv from 'csv';
import iconv from 'iconv-lite';
import _ from 'underscore';

var addEntry = function(record, collection){
	var groupId = record[0];
	var medRef = {
		cis: record[2],
		type: record[3],
		index: record[4]
	};
	var existingEntry = _.findWhere(collection, {id: groupId});
	if(existingEntry){
		existingEntry.meds.push(medRef)
	} else {
		collection.push({
			id: groupId,
			meds: [medRef]
		})
	}
}

export function parseGenericGroups(callback){
	var drugGroups = [];

	// setup parser
	var parser = csv.parse({delimiter: '\t'})
	parser.on('readable', function(){
	  var record;
	  while(record = parser.read()){
	  	addEntry(record, drugGroups);
	  }
	});
	parser.on('finish', function(){
		if(typeof(callback) === 'function'){
			callback(drugGroups);
		}
	})

	// Launch parsing
	var input = fs.createReadStream('./data/CIS_GENER_bdpm.txt')
		.pipe(iconv.decodeStream('win1252'))
	    .pipe(iconv.encodeStream('utf8'))
	    .pipe(parser);
}
