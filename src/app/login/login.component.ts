import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: any[] = [];

  username:any;
  response:any;
  isLoading= false;
  isGenerateOtp=false;
  otpnum:any;

  constructor(private authService: AuthService, 
                      private tokenStorage: TokenStorageService, 
                      private router: Router,
                      private snackBar: MatSnackBar,
                      private userService : UserService) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      //this.roles = this.tokenStorage.getUser().roles
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    this.authService.login(this.form).subscribe(
      data => {

        if(data.message == "your email is not verfied"){
          this.isGenerateOtp = true;
        }else{

       // console.log(  data);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.isGenerateOtp=false;
        //this.roles = this.tokenStorage.getUser().roles;
        //this.router.navigate(['/homepage']);
        this.reloadPage();
        //this.router.navigate(['/test']);
        window.location.replace('/homepage');
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.isGenerateOtp = false;
      }
    
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  validateOtp(){
    this.authService.validateOtp(this.form.username,this.otpnum).subscribe(

      res=>{
        
        if(res.message == "Hello"+this.form.username+". Your Username is verified now you can loggedIn."){
          this.snackBar.open(res.message,'Dismiss',{
     
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass:['success-snackBar'],
          });
          this.isGenerateOtp=false;
          this.isLoginFailed=true;
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


