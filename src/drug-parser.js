import fs from 'fs';
import csv from 'csv';
import iconv from 'iconv-lite';
import _ from 'underscore';
import moment from 'moment';

var parserConfigs = [
	{
		name: 'generic groups',
		fileName: 'CIS_GENER_bdpm.txt',
		parseRow: function(row){
			return {
				id: parseInt(row[0]),
				name: row[1].trim(),
				cis: parseInt(row[2]),
				type: parseInt(row[3]),
				index: parseInt(row[4])
			}
		}
	},
	{
		name: 'drugs',
		fileName: 'CIS_bdpm.txt',
		parseRow: function(row){
			return {
				cis: parseInt(row[0]),
				name: row[1].trim(),
				form: row[2].trim(),
				adminRoute: row[3].trim(),
				authStatus: row[4].trim(),
				authType: row[5].trim(),
				marketState: row[6].trim(),
				authDate: moment(row[7], 'DD/MM/YYYY').toDate(),
				status: row[8].trim(),
				euroAuthNb: row[9].trim(),
				owner: row[10].trim(),
				enforcedMonitoring: row[11].toLowerCase() == 'oui'
			}
		}
	},
	{
		name: 'presentations',
		fileName: 'CIS_CIP_bdpm.txt',
		parseRow: function(row){
			return {
				cis: parseInt(row[0]),
				cip7: parseInt(row[1]),
				name: row[2].trim(),
				status: row[3].trim(),
				marketState: row[4].trim(),
				authDate: moment(row[5], 'DD/MM/YYYY').toDate(),
				cip13: parseInt(row[6]),
				publicAgreement: row[7].toLowerCase() == 'oui',
				reimbursementRate: parseInt(row[8]) / 100,
				priceWoDistrib: parseFloat(row[9].replace(',', '.')),
				price: parseFloat(row[10].replace(',', '.')),
				distribPrice: parseFloat(row[11].replace(',', '.'))
			}
		}
	},
	{
		name: 'compositions',
		fileName: 'CIS_COMPO_bdpm.txt',
		parseRow: function(row){
			return {
				cis: parseInt(row[0]),
				name: row[1].trim(),
				substanceCode: parseInt(row[2]),
				substanceName: row[3].trim(),
				dosing: row[4].trim(),
				refForDosing: row[5].trim(),
				nature: row[6].trim(),
				activeSubstanceToTherapeuticActions: parseInt(row[7])
			}
		}
	}
]

var parseFile = function(config, callback){
	var records = [];

	// setup parser
	var parser = csv.parse({
		delimiter: '\t',
		relax: true
	})
	parser.on('readable', function(){
	  var row;
	  while(row = parser.read()){
	  	records.push(config.parseRow(row));
	  }
	});
	parser.on('finish', function(){
		if(typeof(callback) === 'function'){
			callback(records);
		}
	})

	// Launch parsing
	var input = fs.createReadStream('./data/' + config.fileName)
		.pipe(iconv.decodeStream('win1252'))
	    .pipe(iconv.encodeStream('utf8'))
	    .pipe(parser);
}

var addGroup = function(record, collection){
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
	parseFile(parserConfigs[0], callback);
}

export function parseDrugs(callback){
	parseFile(parserConfigs[1], callback);
}

export function parseCompositions(callback){
	parseFile(parserConfigs[2], callback);
}

export function parsePresentations(callback){
	parseFile(parserConfigs[3], callback);
}
