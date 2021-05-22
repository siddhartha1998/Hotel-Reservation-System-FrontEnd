import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  form = {};
  username: any;
  email: any;
  password: any;
  roles: Set<string> = new Set<string>();
 

value:any;



  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private activatedRouter:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.value=this.activatedRouter.snapshot.params.id;

   
   

  }
 
  //add hotel
  onSubmit() {
    console.log('i am from on submit ' + this.roles);
    this.userService
      .addHotel(this.username, this.email, this.password, this.roles)
      .subscribe(
        (res) => {
          this.snackBar.open(res.message, 'Dismiss', {
            duration: 4000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: ['success-snackBar'],
          });
          this.reloadPage();
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
