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
	continent : string;
	metric : string;
	maxResults : number;

	constructor(private service: CountryInfoService) {
		this.continent = 'all';
		this.metric = 'all';
		this.maxResults = 5;
	}

	async go(target) {
		target.disabled = true;
		let storedContent = target.value;
		target.value = 'Fetching...';
		if(!this.hasResults()) await this.service.fetchData();
		target.disabled = false;
		target.value = storedContent;

		this.applyFilter(this.service.getCountries());
		this.continentList = this.service.getContinentList();

	}

	hasResults() {
		return this.service.fetched();
	}

	applyFilter(countries) {
		if(this.continent != 'all') {
			countries = countries.filter( thisCountry => thisCountry.continent === this.continent );
		}

		this.countries = countries;
	}

	public filterChanged(change) {
		this[change.name] = change.value;

		this.applyFilter(this.service.getCountries());
	}
}
