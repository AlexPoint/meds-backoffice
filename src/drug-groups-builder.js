import _ from 'underscore';
import extend from 'extend';

export function buildGroups(genericGroups, drugs, compositions, presentations){
	// var test = _.find(drugs, function(d){
	// 	return d.cis == 67535309;
	// })
	// console.log(test);

	var groups = _.chain(genericGroups).groupBy('id').map(function(num, key){
		return {
			id: key,
			name: num[0].name,
			drugAndTypes: _.map(num, function(grp){
				var drug = _.find(drugs, {cis: grp.cis});
				if(drug !== undefined){
					var drugCompositions = _.chain(compositions).where({cis: drug.cis}).map(function(compo){ 
						delete compo.cis;
						return compo;
					}).value();
					var drugPresentations = _.chain(presentations).where({cis: drug.cis}).map(function(pres){
						delete pres.cis;
						return pres;
					}).value();
					drug = extend(drug, {presentations: drugPresentations}, {compositions: drugCompositions});
				}
				return {
					drug: drug,
					type: grp.type,
					index: grp.index
				};
			})
		};
	}).value();
	return groups;
}