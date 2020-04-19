import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnChanges {
	@Input() continentList : Array<{ name : string, value : string }>
	@Output() filterEvent = new EventEmitter<any>();

	constructor() {	}

	ngOnChanges(changes: {[propKey: string]: SimpleChange}) { }

	filterChanged(target) {
		this.filterEvent.emit({ name: target.name, value: target.value });
	}
}
