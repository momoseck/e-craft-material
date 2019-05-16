import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Compte } from 'src/app/models/Compte';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {
  appUser: Compte = null;
  // BAR CHART
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['dakar', 'thies', 'diourbel', 'louga', 'fatick', 'kaolack',
    'saint-Louis', 'matam', 'tamba', 'kolda', 'kaffrine', 'ziguinchor', 'sedhiou', 'kedougou'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    { data: [65, 40, 50, 41, 46, 35, 40, 25, 40, 30, 45, 25, 28, 15], label: 'Section Art' },
    { data: [45, 29, 20, 21, 16, 25, 40, 25, 40, 30, 45, 45, 28, 25], label: 'Section Service' },
    { data: [40, 38, 40, 19, 26, 27, 40, 40, 20, 20, 40, 30, 20, 20], label: 'Section Production' }
  ];

  public barChartColor: any = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgb(66, 161, 133)'
      ]
    }
  ];
  // -----------------
  // DOUGH CHART
  public doughnutChartLabels = ['Section ART', 'Section PRODUCTION', 'Section SERVICE'];
  public doughnutChartData = [98, 65, 180];
  public doughnutChartType = 'doughnut';
  // -----------
  // PIE CHART
  public pieChartLabels = ['Section ART', 'Section PRODUCTION', 'Section SERVICE'];
  public pieChartData = [98, 65, 180];
  public pieChartType = 'pie';

  public pieChartColor: any = [
    {
      backgroundColor: ['rgb(168, 236, 216)',
        'rgb(66, 161, 133)',
        'rgb(2, 85, 60)'
      ]
    }
  ];
  // ---------------
  /** Based on the screen size, switch from standard to one column per row */
  constructor() { }

  ngOnInit(): void {

  }
}
