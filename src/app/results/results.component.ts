import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { CountryService } from '../country.service';
import { Country } from '../country';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges {
	@Input() filter : { continent : string, metric : string, maxResults : number };
	public countries : Array<Country>;
	public showArea : boolean;
	public showPopulation : boolean;
	public chartMaxResults : number;

	constructor(private countryService: CountryService) {
		this.filter = {
			continent: null,
			metric: null,
			maxResults: 5
		};
		this.countries = [];
		this.showArea = true;
		this.showPopulation = true;
		this.chartMaxResults = 5;
	}

	ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
		if(changes.filter) {
			this.countries = this.countryService.getCountries(changes.filter.currentValue.continent);	
			this.showArea = (!changes.filter.currentValue.metric) || changes.filter.currentValue.metric === 'areaInSqKm';
			this.showPopulation = (!changes.filter.currentValue.metric) || changes.filter.currentValue.metric === 'population';
			this.chartMaxResults = changes.filter.currentValue.maxResults;
		}
	}
}