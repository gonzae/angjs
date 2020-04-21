import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-pies',
  templateUrl: './pies.component.html',
  styleUrls: ['./pies.component.css']
})
export class PiesComponent implements OnChanges {
	@Input() countries : Array<any>;
	@Input() metric : string;
	@Input() maxResults : number;

	areaChart : Chart;
	populationChart : Chart;

	constructor() { }

	ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
		if(changes.countries) {
			if(changes.countries.currentValue) this.updateChart(changes.countries.currentValue);
		}

		if(changes.maxResults) {
			this.updateChart(this.countries);
		}
	}

	buildChartForType(countries, chartType, title) {
		countries = this.sortBy(countries, chartType, 'DESC');

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
		        name: 'Brands',
		        colorByPoint: true,
		        data
		    } ]
		} as any);
	}

	updateChart(countries) {
		this.areaChart = this.buildChartForType(countries, 'areaInSqKm', 'Area');
		this.populationChart = this.buildChartForType(countries, 'population', 'Population');
	}

	sortBy(countries, fieldName, dir) {
		countries.sort((a, b) => {
			if( dir === 'ASC' ) return a[fieldName] < b[fieldName] ? -1 : 1;
			else return a[fieldName] > b[fieldName] ? -1 : 1;
		} );
		return countries
	}

}
