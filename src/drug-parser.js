import fs from 'fs';
import csv from 'csv';
import iconv from 'iconv-lite';
import _ from 'underscore';

var parserConfigs = [
	{
		name: 'generic groups',
		fileName: 'CIS_GENER_bdpm.txt',
		parseRow: function(row){
			return {
				id: row[0],
				name: row[1],
				cis: row[2],
				type: row[3],
				index: row[4]
			}
		}
	},
	{
		name: 'drugs',
		fileName: 'CIS_bdpm.txt',
		parseRow: function(row){
			return {
				cis: row[0],
				name: row[1],
				form: row[2],
				adminRoute: row[3],
				authStatus: row[4],
				authType: row[5],
				marketState: row[6],
				authDate: row[7],
				status: row[8],
				euroAuthNb: row[9],
				owner: row[10],
				enforcedMonitoring: row[11]
			}
		}
	},
	{
		name: 'presentations',
		fileName: 'CIS_CIP_bdpm.txt',
		parseRow: function(row){
			return {
				cis: row[0],
				cip7: row[1],
				name: row[2],
				status: row[3],
				marketState: row[4],
				authDate: row[5],
				cip13: row[6],
				publicAgreement: row[7],
				reimbursementRate: row[8],
				priceWoDistrib: row[9],
				price: row[10],
				distribPrice: row[11]
			}
		}
	},
	{
		name: 'compositions',
		fileName: 'CIS_COMPO_bdpm.txt',
		parseRow: function(row){
			return {
				cis: row[0],
				name: row[1],
				substanceCode: row[2],
				substanceName: row[3],
				dosing: row[4],
				refForDosing: row[5],
				nature: row[6],
				activeSubstanceToTherapeuticActions: row[7]
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
