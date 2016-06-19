import _ from 'underscore';

export function buildGroups(genericGroups, drugs, compositions, presentations){
	var groups = _.chain(genericGroups).groupBy('id').map(function(num, key){
		return {
			id: key,
			name: num[0].name,
			drugs: num
		};
	}).value();
	return groups;
}