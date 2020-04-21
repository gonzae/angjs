import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Country } from '../../country';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {
	@Input() countries : Array<Country>;
	@Input() showAreaColumn : boolean;
	@Input() showPopulationColumn : boolean;

	public total : { areaInSqKm: number, population: number };

	constructor() {
		this.total = {
			areaInSqKm : 0,
			population : 0
		};
	}

	ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
		if(changes.countries) {
			if(changes.countries.currentValue) this._updateTotal(changes.countries.currentValue);
		}
	}

	public sortColumn(target : any) : void {
		const fieldName = target.dataset.field;
		const dir = target.dataset.sort;

		this.countries.sort((a, b) => {
			if( dir === 'ASC' ) return a[fieldName] < b[fieldName] ? -1 : 1;
			else return a[fieldName] > b[fieldName] ? -1 : 1;
		} );

		target.dataset.sort = dir === 'ASC' ? 'DESC' : 'ASC';
	}

	private _updateTotal(countries : Array<Country>) : void {
		this.total = countries.reduce( (total, country) => {
			total.areaInSqKm += country.areaInSqKm;
			total.population += country.population;
			return total;
		}, {
			areaInSqKm : 0,
			population : 0
		} );
	}

}
