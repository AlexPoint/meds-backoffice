import fs from 'fs';
import csv from 'csv';
import iconv from 'iconv-lite';

var output = [];
var parser = csv.parse({delimiter: '\t'})
var input = fs.createReadStream('./data/CIS_CPD_bdpm.txt')
	.pipe(iconv.decodeStream('win1252'))
    .pipe(iconv.encodeStream('utf8'));

var transformer = csv.transform(function(record, callback){
  setTimeout(function(){
    callback(null, record.join(' ')+'\n');
  }, 500);
}, {parallel: 10});
input.pipe(parser).pipe(transformer).pipe(process.stdout);