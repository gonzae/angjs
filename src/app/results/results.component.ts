import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges {
	@Input() countries : Array<any>;
	@Input() filter : { continent : string, metric : string, maxResults : number };

	constructor() { }

	ngOnChanges(changes: {[propKey: string]: SimpleChange}) { }

	showAreaColumn() {
		return this.filter.metric === 'areaInSqKm' || this.filter.metric === 'all';
	}

	showPopulationColumn() {
		return this.filter.metric === 'population' || this.filter.metric === 'all';
	}
}