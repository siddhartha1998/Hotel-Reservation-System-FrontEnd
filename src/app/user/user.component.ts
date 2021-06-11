import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  registeredUserDetail:any;
  userId:any;
  username:any;
  password:any;
  roles: Set<string> = new Set<string>();
  role:any;
  email:any;
  viewUser:any;
  page: number = 1;

  isRegisteredUser:boolean=false;

  constructor( private userService : UserService,
                      private snackBar : MatSnackBar)      
                       { }

  ngOnInit(): void {
    this.viewRegisteredHotel();
  }

  key:string='id';
reverse:boolean=true;
sort(key:string){​​​​​
this.key=key;
this.reverse= !(this.reverse);
}

viewRegisteredHotel() {
  this.userService.getRegisteredHotel().subscribe(
    (res:any) => {
      console.log(res);
      this.registeredUserDetail = res;
      // this.totalRecords=this.hotelDetail.length;
    
      // this.isRegisteredHotel= true;
      this.isRegisteredUser=true;
      
    },
    (err:any) => {
      console.log(err);
    }
  );
}

//auto filled data on the view detail of registered user
UserClicked(id:any){
  this.userService.getRegisteredUserById(id).subscribe(

    res=>{
      this.viewUser=res;
      this.username=res.username;
      this.email=res.email;
      this.role=res.roles[0].name;
      console.log(this.role);
      this.userId=res.id;
      console.log(this.viewUser);

    },
    err=>{
     console.log(err);
    }
  );
}

onSubmit() {
  // console.log('i am from on submit ' + this.roles);
  this.userService.addHotel(this.username, this.email, this.password, this.roles)
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
