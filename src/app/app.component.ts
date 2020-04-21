import { Component } from '@angular/core';

import { Country } from './country';
import { CountryService } from './country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CountryService]
})

export class AppComponent {
	filter: { continent? : string, metric? : string, maxResults : number };
	continentList: Array<{ name : string, value : string }>;

	constructor(private countryService: CountryService) {
		this.continentList = [];
		this.filter = {
			continent: null,
			metric: null,
			maxResults: 5
		};
	}

	async go(target : any) {
		target.disabled = true;
		let storedContent = target.value;
		target.value = 'Fetching...';
		if(!this.hasResults()) await this.countryService.fetch();
		target.disabled = false;
		target.value = storedContent;

		this.continentList = this.countryService.getContinentList();
	}

	public hasResults() : boolean {
		return this.countryService.isLoaded();
	}

	public filterChanged(change : any) : void {
		let filter = Object.assign({}, this.filter);
		
		filter[change.name] = change.value === 'null' ? null : change.value;

		this.filter = filter;
	}
}
