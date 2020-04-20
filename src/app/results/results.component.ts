import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Chart } from 'angular-highcharts';

import { Country } from '../country';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges {
	@Input() countries : Array<any>;
	@Input() metric : string;
	@Input() maxResults : number;
	total : { areaInSqKm: number, population: number };

	areaChart : Chart;
	populationChart : Chart;

	constructor() {
		this.total = {
			areaInSqKm : 0,
			population : 0
		};
	}

	ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
		if(changes.countries) {
			if(changes.countries.currentValue) this.updateTotal(changes.countries.currentValue);
			if(changes.countries.currentValue) this.updateChart(changes.countries.currentValue);
		}
	}

	buildChartForType(countries, chartType) {
		countries = this.sortby(countries, chartType, 'DESC');

		if(! countries.length) return;;

		const data = countries.reduce( (data, country) => {
			if(data.length <= this.maxResults) {
				data.push( {name : country.countryName, y: country[chartType]} );
			} else {
				const accumulated = data[this.maxResults].y + country[chartType];
				data[this.maxResults] = { name : 'Other', y: accumulated };
			}
			return data;
		}, [] );

		return new Chart({
			chart: {
			    plotBackgroundColor: null,
			    plotBorderWidth: null,
			    plotShadow: false,
			    type: 'pie'
			  },
				title: {
				    text: chartType
				},
			  tooltip: {
			    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			  },
			  accessibility: {
			    point: {
			      valueSuffix: ' %'
			    }
			  },
			  plotOptions: {
			    pie: {
			      allowPointSelect: true,
			      cursor: 'pointer',
			      dataLabels: {
			        enabled: true,
			        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
			      }
			    }
			  },
		    series: [{
		        name: 'Brands',
		        colorByPoint: true,
		        data
		    } ]
		} as any);
	}

	updateChart(countries) {
		this.areaChart = this.buildChartForType(countries, 'areaInSqKm');
		this.populationChart = this.buildChartForType(countries, 'population');
	}

	updateTotal(countries) {
		this.total = countries.reduce( (total, country) => {
			total.areaInSqKm += country.areaInSqKm;
			total.population += country.population;
			return total;
		}, {
			areaInSqKm : 0,
			population : 0
		} );
	}

	sortby(countries, fieldName, dir) {
		countries.sort((a, b) => {
			if( dir === 'ASC' ) return a[fieldName] < b[fieldName] ? -1 : 1;
			else return a[fieldName] > b[fieldName] ? -1 : 1;
		} );
		return countries
	}

	sortColumn(target) {
		const targetName = target.dataset.field;
		const sortType = target.dataset.sort;

		this.countries.sort((a, b) => {
			if( sortType === 'ASC' ) return a[targetName] < b[targetName] ? -1 : 1;
			else return a[targetName] > b[targetName] ? -1 : 1;
		} );

		target.dataset.sort = sortType === 'ASC' ? 'DESC' : 'ASC';
	}
}