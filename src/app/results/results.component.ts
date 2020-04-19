import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Country } from '../country';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges {
	@Input() countries : Array<any>;
	total : { areaInSqKm: number, population: number };

	constructor() {
		this.total = {
			areaInSqKm : 0,
			population : 0
		};
	}

	ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
		if(changes.countries) {
			if(changes.countries.currentValue) this.updateTotal(changes.countries.currentValue);
		}
	}

	updateTotal(countries) {
		this.total = countries.reduce( (total, country) => {
			total.areaInSqKm += parseFloat(country.areaInSqKm);
			total.population += parseInt(country.population);
			return total;
		}, {
			areaInSqKm : 0,
			population : 0
		} );
	}

	sortBy(target) {
		const targetName = target.textContent;
		const sortType = target.dataset.sort;

		this.countries.sort((a, b) => {
			if( sortType === 'ASC' ) return a[targetName] < b[targetName] ? -1 : 1;
			else return a[targetName] > b[targetName] ? -1 : 1;
		} );

		target.dataset.sort = sortType === 'ASC' ? 'DESC' : 'ASC';
	}
}