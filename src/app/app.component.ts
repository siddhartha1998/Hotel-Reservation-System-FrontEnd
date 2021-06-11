import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  private roles: string[]=[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: any;
  user:any;
  uploadDir:any;
  profilePicture:any;
  showForAdmin:boolean=false;
  showUserForAdmin:boolean=false;
  showRoomForAdmin:boolean=false;

  constructor(
    private tokenStorageService : TokenStorageService, 
    private router : Router,
    private userService : UserService
    ) { }

  ngOnInit(): void {
    
   if(this.tokenStorageService.getToken()!= null){
     this.isLoggedIn = true;

    //  window.location.reload();
    // window.location.replace('/homepage');

   }
    
    if (this.isLoggedIn== true) {
       this.user = this.tokenStorageService.getUser();
       this.getPhotoOfadmin(this.user.id);
      
     // console.log(this.user);

      this.roles = this.user.roles;
     
      //console.log(this.roles);
      if(this.roles.includes('ROLE_ADMIN')||this.roles.includes('ROLE_HOTEL')){
        this.showAdminBoard = true;
        
      }
      if(this.roles.includes('ROLE_ADMIN')){
        this.showForAdmin=true;
        this.showUserForAdmin=true;
        this.showRoomForAdmin=true;
      }
      if(this.roles.includes('ROLE_HOTEL')){
        this.showForAdmin=false;
        this.showUserForAdmin=false;
        this.showRoomForAdmin=false;
      }
     
      this.username = this.user.username;
    }else{
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
    //window.location.reload();
  
  
  }

  getPhotoOfadmin(id:any){
    this.userService.getProfilePicture(id).subscribe(

      res=>{
        this.uploadDir=res.uploadDir;
        
        this.userService.loadProfilePicture(this.uploadDir).subscribe(
          res=>{
            console.log(res.type);
           this.getImageFromBlob(res);
          },
          err=>{
            console.log(err);
          }
        );
        
      },
      err=>{
        console.log(err);
        
      }
    );
  }

  //photo received method
getImageFromBlob(image:Blob){
  let reader=new FileReader();
  reader.addEventListener("load",()=>{
    this.profilePicture=reader.result;
  },
  false);
  if(image){
    reader.readAsDataURL(image);
  }
  }

}
