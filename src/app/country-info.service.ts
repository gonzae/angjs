import { Injectable } from '@angular/core';
import { Country } from './country';

const API_ENDPOINT_URL = 'http://api.geonames.org/countryInfoJSON?formatted=true&username=hydrane';

@Injectable({
  providedIn: 'root'
})
export class CountryInfoService {
	countries : Array<Country>;
	continentList : Array<{ name : string, value : string }>;

	public constructor() {
		this.countries = [];
		this.continentList = [];
	}

	public fetched() {
		return this.countries.length > 0;
	}

	public async fetchData() {
		const res = await fetch(API_ENDPOINT_URL);
		const parsedJSON = await res.json();
		this.countries = parsedJSON.geonames;

		const filteredContinents = parsedJSON.geonames.reduce( (memo, country) => {
			const continent = { name : country.continentName, value : country.continent };
			if(!memo.map(o => o.value).includes(continent.value)) memo.push(continent);
			return memo;
		}, [] );
		
		// Sort them alphabetically
		filteredContinents.sort( (a, b) => a.name > b.name ? 1 : -1 );

		this.continentList = filteredContinents;
	}

	public getCountries() : Array<Country> {
		return this.countries;
	}

	public getContinentList() : Array<{ name : string, value : string }> {
		return this.continentList;
	}

}
