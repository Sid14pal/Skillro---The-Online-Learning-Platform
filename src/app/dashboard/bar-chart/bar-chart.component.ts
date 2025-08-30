import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {



public barChartOptions: ChartOptions<'bar'> = {
  responsive: true,
};

public barChartLabels: string[] = ['2022', '2023', '2024', '2025'];

public barChartData: ChartData<'bar'> = {
  labels: this.barChartLabels,
  datasets: [
    { data: [65, 59, 80, 81], label: 'Series A' },
    { data: [28, 48, 40, 19], label: 'Series B' }
  ]
};

}
