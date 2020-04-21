import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Chart } from 'angular-highcharts';

import { Country } from '../../country';

@Component({
  selector: 'app-pies',
  templateUrl: './pies.component.html',
  styleUrls: ['./pies.component.css']
})
export class PiesComponent implements OnChanges {
	@Input() countries : Array<any>;
	@Input() showAreaChart : boolean;
	@Input() showPopulationChart : boolean;
	@Input() chartMaxResults : number;

	public areaChart : Chart;
	public populationChart : Chart;

	constructor() { }

	ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
		if(changes.countries) {
			if(this.showAreaChart) this.areaChart = this._buildChart(changes.countries.currentValue, 'areaInSqKm', 'Area', this.chartMaxResults);
			if(this.showPopulationChart) this.populationChart = this._buildChart(changes.countries.currentValue, 'population', 'Population', this.chartMaxResults);
		}

		if(changes.chartMaxResults) {
			if(this.showAreaChart) this.areaChart = this._buildChart(this.countries, 'areaInSqKm', 'Area', changes.chartMaxResults.currentValue);
			if(this.showPopulationChart) this.populationChart = this._buildChart(this.countries, 'population', 'Population', changes.chartMaxResults.currentValue);
		}
	}

	private _buildChart(countries: Array<Country>, chartType: 'areaInSqKm' | 'population', title: string, maxResults: number) : Chart {
		countries = this._sortBy(countries, chartType, 'DESC');

		if(! countries.length) return;;

		const data = countries.reduce( (data, country) => {
			if(data.length <= maxResults) {
				data.push( {name : country.countryName, y: country[chartType]} );
			} else {
				const accumulated = data[maxResults].y + country[chartType];
				data[this.chartMaxResults] = { name : 'Other', y: accumulated };
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
				text: title
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
				name: title,
				colorByPoint: true,
				data
			} ]
		} as any);
	}

	private _sortBy(countries: Array<Country>, fieldName: string, dir: 'ASC' | 'DESC') : Array<Country> {
		countries.sort((a, b) => {
			if( dir === 'ASC' ) return a[fieldName] < b[fieldName] ? -1 : 1;
			else return a[fieldName] > b[fieldName] ? -1 : 1;
		} );
		return countries
	}

}
