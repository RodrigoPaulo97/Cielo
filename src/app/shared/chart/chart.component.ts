import { DataSource } from '@angular/cdk/collections';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Item } from 'src/app/interface/main.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges {

  @Input('lineChartData') lineChartData!: ChartConfiguration<'bar'>['data']

  public lineChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    backgroundColor : '#c88108',
    plugins: {
      legend: {
        display: false
      },
    }

  };
  public lineChartLegend = true;

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
  }



}
