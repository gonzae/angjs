import { Component } from '@angular/core';
import _ from 'underscore';

const API_ENDPOINT_URL = 'http://api.geonames.org/countryInfoJSON?formatted=true&username=hydrane';

interface Country {
	continent: string;
	capital: string;
	languages: string;
	geonameId: number;
	south: number;
	isoAlpha3: string;
	north: number;
	fipsCode: string;
	population: string;
	east: number;
	isoNumeric: string;
	areaInSqKm: string;
	countryCode: string;
	west: number;
	countryName: string;
	continentName: string;
	currencyCode: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
  // styleUrls: ['./app.component.css']
})

export class AppComponent {
	countries : Array<Country>;
	continentList : Array<{ name : string, value : string }>;

	constructor() {
		this.countries = [];
		this.continentList = [];
	}

	async go() {
		if(!this.countries.length) await this.fetchData();
	}

	async fetchData() {
		const res = await fetch(API_ENDPOINT_URL);
		const parsedJSON = await res.json();
		this.countries = parsedJSON.geonames;
		this.continentList = this.getContinentListFromCountries(this.countries);
	}

	getContinentListFromCountries(countries : Array<Country>) {
		const filteredContinents = _.reduce( countries, (memo, country) => {
			const continent = { name : country.continentName, value : country.continent };
			if(!_.pluck(memo, 'value').includes(continent.value)) memo.push(continent);
			return memo;
		}, [] );
		
		// Sort them alphabetically
		filteredContinents.sort( (a, b) => a.name > b.name ? 1 : -1 );

		return filteredContinents;
	}
}
