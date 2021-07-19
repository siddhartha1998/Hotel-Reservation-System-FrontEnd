import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  form: any = {};
  registeredUserDetail:any;
  userId:any;
  username:any;
  password:any;
  searchResult:any;
  // roles: Set<string> = new Set<string>();
  roles:any[]=[];
  role:any;
  roleId:any;
  email:any;
  viewUser:any;
  page: number = 1;
  errorMessage = '';

  isRegisteredUser:boolean=false;
  isSuccessful:boolean = false;
  isSignUpFailed:boolean = false;

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

selectRole(event:any){
    this.roles.push(event.target.value);
}
onSubmit() {
  this.userService.userRegister(this.form.username, this.form.email, this.form.password, this.roles)
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
        this.errorMessage = err.error.message;
      }
    );
}
reloadPage(): void {
  window.location.reload();
}

}
