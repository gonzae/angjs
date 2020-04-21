import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges {
	@Input() countries : Array<any>;
	@Input() metric : string;
	@Input() maxResults : number;

	constructor() {}

	ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
		// if(changes.countries) {
		// 	if(changes.countries.currentValue) this.updateTotal(changes.countries.currentValue);
		// }
	}

	// updateTotal(countries) {
	// 	this.total = countries.reduce( (total, country) => {
	// 		total.areaInSqKm += country.areaInSqKm;
	// 		total.population += country.population;
	// 		return total;
	// 	}, {
	// 		areaInSqKm : 0,
	// 		population : 0
	// 	} );
	// }

	// sortBy(countries, fieldName, dir) {
	// 	countries.sort((a, b) => {
	// 		if( dir === 'ASC' ) return a[fieldName] < b[fieldName] ? -1 : 1;
	// 		else return a[fieldName] > b[fieldName] ? -1 : 1;
	// 	} );
	// 	return countries
	// }

	// sortColumn(target) {
	// 	const targetName = target.dataset.field;
	// 	const sortType = target.dataset.sort;

	// 	this.countries = this.sortBy(this.countries, targetName, sortType);

	// 	target.dataset.sort = sortType === 'ASC' ? 'DESC' : 'ASC';
	// }
}