import { Injectable } from '@angular/core';
import { Country } from './country';

const API_ENDPOINT_URL = 'http://api.geonames.org';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
	countries : Array<Country>;
	continentList : Array<{ name : string, value : string }>;

	public constructor() {
		this.countries = [];
		this.continentList = [];
	}

	public async fetch() : Promise<void> {
		const countryInfo = await this._getCountryInfo();

		// Sort them alphabetically
		countryInfo.sort( (a, b) => a.countryName > b.countryName ? 1 : -1 );
		this.countries = countryInfo;

		const filteredContinents = countryInfo.reduce( (memo, country) => {
			const continent = { name: country.continentName, value: country.continent };
			if(!memo.map(o => o.value).includes(continent.value)) memo.push(continent);
			return memo;
		}, [] );
		
		// Sort them alphabetically
		filteredContinents.sort( (a, b) => a.name > b.name ? 1 : -1 );

		this.continentList = filteredContinents;
	}

	public isLoaded() : boolean {
		return this.countries.length > 0;
	}

	public getCountries(continentName?: string) : Array<Country> {
		if( !continentName ) return this.countries;

		return this.countries.filter( country => country.continent === continentName );
	}

	public getContinentList() : Array<{ name: string, value: string }> {
		return this.continentList;
	}

	private async _getCountryInfo() : Promise<Array<Country>> {
		const res = await fetch(API_ENDPOINT_URL + '/countryInfoJSON?formatted=true&username=hydrane');
		const parsedJSON = await res.json();
		
		return parsedJSON.geonames.map( thisCountry => this._parseCountryResponse(thisCountry) );
	}

	private _parseCountryResponse(rawCountry: any) : Country {
		return {
			...rawCountry,
			population: parseInt(rawCountry.population),
			areaInSqKm: parseFloat(rawCountry.areaInSqKm)
		}
	}

}
