import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../_services/location.service';
import { UserService } from '../_services/user.service';
import { ChartComponent } from "ng-apexcharts";


import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {

  
  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  form = {};
  username: any;
  email: any;
  password: any;
  roles: Set<string> = new Set<string>();
value:any;



  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private activatedRouter:ActivatedRoute,
    private locationService : LocationService
  ) {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "donut"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

  }

  ngOnInit(): void {
    this.value=this.activatedRouter.snapshot.params.id;

 this.locationService.getPosition().then(pos=>
  {
     console.log(`Positon: ${pos.lng} ${pos.lat}`);
  });
  }
 
  //add hotel
  onSubmit() {
    // console.log('i am from on submit ' + this.roles);
    this.userService.userRegister(this.username, this.email, this.password, this.roles)
      .subscribe(
        (res) => {
          this.snackBar.open(res.message, 'Dismiss', {
            duration: 4000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: ['success-snackBar'],
          });
          // this.reloadPage();
        },
        (err) => {
          console.log(err);
        }
      );
  }
  reloadPage(): void {
    window.location.reload();
  }

 
}
