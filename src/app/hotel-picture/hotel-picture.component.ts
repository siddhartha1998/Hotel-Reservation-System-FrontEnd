import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { HotelPicture } from './hotel-picture.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-hotel-picture',
  templateUrl: './hotel-picture.component.html',
  styleUrls: ['./hotel-picture.component.css']
})
export class HotelPictureComponent implements OnInit {

  value:any;
  showHotelImage:boolean=true;
  retrievedImage: any;
  collectionOfHotelImages:Array<HotelPicture>;
  uploadDir:any;
  hotelPictureDetail:any
  fileName:any;
  uploadedBy:any;
  uploadedTime:any;

  constructor( private activatedRouter : ActivatedRoute,
                       private userService : UserService,
                       private snackBar : MatSnackBar,
                       private location : Location )
   { 
    this.collectionOfHotelImages = new Array<HotelPicture>();
  }

  ngOnInit(): void {
    this.value=this.activatedRouter.snapshot.paramMap.get("id");
    
    this.userService.getPictureOfHotel(this.value).subscribe(
      res=>{ 
        this.hotelPictureDetail=res;
        if(res.length == 0){
          this.showHotelImage = false;
        }else{
  
        for(let i =0; i< res.length; i++){
          this.uploadDir = res[i].uploadDir;
          if(this.uploadDir!=null){
          this.userService.loadHotelPicture(this.uploadDir).subscribe(
           (res:Blob)=>{

            let reader=new FileReader();
            reader.addEventListener("load",()=>{
              this.retrievedImage=reader.result;
              this.collectionOfHotelImages[i] = this.retrievedImage;
              this.showHotelImage=true;
            },
            false);
            if(res){
              reader.readAsDataURL(res);
            }
            },
            err=>{
              console.log(err);
            }
          );
            }
        }
      }
     
      },
      err=>{
        this.retrievedImage = null;
        console.log(err);
        this.showHotelImage=false;
      }
    
    );

  }

  refresh(){
    window.location.reload();
  }

  backClicked(){
    this.location.back();
  }

  deleteHotelPicture(id:any){
    this.userService.deleteHotelPic(id).subscribe(
  res=>{
    this.snackBar.open(res.message, 'Dismiss', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['red-snackBar'],
    });
    this.refresh();
  },
  
  err=>{
    console.log(err);
  }
    );
  }

}
