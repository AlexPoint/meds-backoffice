import fs from 'fs';
import csv from 'csv';
import iconv from 'iconv-lite';
import _ from 'underscore';

var output = [];
var parser = csv.parse({delimiter: '\t'})

var addEntry = function(record, output){
	var groupId = record[0];
	var medRef = {
		cis: record[2],
		type: record[3],
		index: record[4]
	};
	var existingEntry = _.findWhere(output, {id: groupId});
	if(existingEntry){
		existingEntry.meds.push(medRef)
	} else {
		output.push({
			id: groupId,
			meds: [medRef]
		})
	}
}

//Use the writable stream api
parser.on('readable', function(){
  var record;
  while(record = parser.read()){
  	addEntry(record, output);
    //output.push(record);
  }
});
parser.on('finish', function(){
	console.log("Done parsing " + output.length + " groups");
})

var input = fs.createReadStream('./data/CIS_GENER_bdpm.txt')
	.pipe(iconv.decodeStream('win1252'))
    .pipe(iconv.encodeStream('utf8'))
    .pipe(parser);
console.log("start parsing csv file")

// var transformer = csv.transform(function(record, callback){
//   setTimeout(function(){
//     callback(null, record.join(' ')+'\n');
//   }, 500);
// }, {parallel: 10});
//input.pipe(parser);
