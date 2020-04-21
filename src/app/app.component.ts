import { Component } from '@angular/core';

import { Country } from './country';
import { CountryInfoService } from './country-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CountryInfoService]
})

export class AppComponent {
	countries : Array<Country>;
	continentList : Array<{ name : string, value : string }>;
	filter : { continent : string, metric : string, maxResults : number };

	constructor(private service: CountryInfoService) {
		this.filter = {
			continent: 'all',
			metric: 'all',
			maxResults: 5
		};
	}

	async go(target) {
		target.disabled = true;
		let storedContent = target.value;
		target.value = 'Fetching...';
		if(!this.hasResults()) await this.service.fetchData();
		target.disabled = false;
		target.value = storedContent;

		this.applyFilter(this.service.getCountries(), this.filter);
		this.continentList = this.service.getContinentList();
	}

	hasResults() {
		return this.service.fetched();
	}

	applyFilter(countries, filter) {
		if(filter.continent != 'all') {
			countries = countries.filter( thisCountry => thisCountry.continent === filter.continent );
		}

		this.countries = countries;
	}

	public filterChanged(change) {
		this.filter[change.name] = change.value;

		this.applyFilter(this.service.getCountries(), this.filter);
	}
}
