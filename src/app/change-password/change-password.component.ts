import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form: any = {};
// newPassword:any;
// confirmPassword:any;
isChangePassword = false;
errorMessage:any;
newPassword:any;
confirmPassword:any;

currentUser:any;
username:any;


  constructor(
    private tokenStorageService : TokenStorageService,
    private userService : UserService,
    private router : Router
    
  ) { }

  ngOnInit(): void {
this.currentUser=this.tokenStorageService.getUser();
this.username=this.currentUser.username;

  }
  onSubmit():void{
    
    this.userService.changePassword(this.username,this.form).subscribe(

      res=>{
          this.logout();
        
      },
      err=>{
        console.log(err);
      }
      );
    }
 
    logout(){
      this.tokenStorageService.signOut();
      this.router.navigate(['/login']);
    }
  
   

  }


