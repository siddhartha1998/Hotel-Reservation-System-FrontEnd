import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  isOtpGenerated:boolean=false;

  username:any;
  email:any;
  responseFromServer:any;
  otpnum:any;

  constructor(
    private userService : UserService,
    private router : Router,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  generateOtp(){

    // this.isLoading = true;
    this.userService.generateOtp(this.username,this.email).subscribe(
      (res:any) =>{
        this.responseFromServer = res.message;
        if(this.responseFromServer == "Otp is generated check your email"){
            // this.isLoading = false;
            this.isOtpGenerated = true;
        }else{
          // this.isLoading = false;
          this.isOtpGenerated = false;
          this.snackBar.open(res.message,'Dismiss',{
       
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass:['red-snackBar'],
          });
        }
       // console.log(res);
      },
      err =>{
        // this.isLoading = false;
        this.snackBar.open(err.message,'Dismiss',{
       
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['red-snackBar'],
        });

        setTimeout(()=>{
         window.location.reload();
        },5000);
      }
    );

  }

  validateOtp(){
    this.userService.validateOtp(this.username,this.otpnum).subscribe(

      res=>{
        
        if(res.message == "Check your email. We have sent you a new password. Use that password to login into the system and update it after login."){
          this.snackBar.open(res.message,'Dismiss',{
     
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass:['success-snackBar'],
          });

          setTimeout(()=>{
            this.router.navigate(['/login']);
          },5000);

        }else{
          // this.isLoading = false;
          this.snackBar.open("otp did not match",'Dismiss',{
     
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass:['red-snackBar'],
          });
        }

      },
      err=>{
       
        // this.isLoading = false;
        this.snackBar.open(err.message,'Dismiss',{
       
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['red-snackBar'],
        });

        // setTimeout(()=>{
        //   this.router.navigate(['/login']);
        // },5000);

      }
    );
  }

}
