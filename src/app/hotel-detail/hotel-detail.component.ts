import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../_services/hotel.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {
  form:any;
  currentUser:any;

  hotelId:any;
  hotelName:any;
  hotelUsername:any;
  hotelOwner:any;
  city:any;
  hotelAddress:any;
  phone:any;
  panNumber:any;
  latitude:any;
  longitude:any;
  description:any;
  hotelDocument:any;

  value:any;
  uploadDir:any;
  retrievedImage:any;
  selectedFile:any;
  isSelectedFile:any;
  progress:any;

  constructor( private hotelService : HotelService,
                      private snackBar : MatSnackBar,
                      private activatedRouter : ActivatedRoute)
                 { }

  ngOnInit(): void {
    this.value=this.activatedRouter.snapshot.paramMap.get("id");
    this.getHotel();
  }

   // For role hotel
       
   getHotel(){
    this.hotelService.getHotelById(this.value).subscribe(
      res=>{
        console.log(res);
        this.hotelId=res.id;
     this.hotelName=res.hotelName;
     this.hotelUsername=res.hotelUsername;
     this.hotelOwner=res.hotelOwner;
     this.city=res.city;
     this.hotelAddress=res.hotelAddress;
     this.phone=res.phone;
     this.panNumber=res.panNumber;
     this.latitude=res.latitude;
     this.longitude=res.longitude;
     this.description=res.description;
         
      },
      err=>{
        console.log(err);
        
      }
    );
  }

    //edit active Hotel
    editHotel(id:any){
      this.hotelService.editHotelDetail(id,this.hotelName,this.hotelOwner,this.city,this.hotelAddress,
        this.panNumber,this.phone,this.description).subscribe(
        res =>{
          
          this.snackBar.open(res.message, 'Dismiss', {
           duration: 4000,
           verticalPosition: 'bottom',
           horizontalPosition: 'right',
           panelClass: ['success-snackBar'],
   
         });
         this.refresh();
        },
        err =>{
          console.log(err);
        }
      )
     }

  refresh(){
    window.location.reload();
  }

  selectHotelPictureHandler(event:any){
    this.selectedFile=event.target.files[0];
    this.isSelectedFile=true;
  }

  selectDocumentFileHandler(event:any){
    this.selectedFile=event.target.files[0];
    this.isSelectedFile=true;
  }

  uploadHotelPicture(id:any){
    // this.isLoading = true;
   const uploadProfileImage:FormData = new FormData();
   uploadProfileImage.append('hotelPic',this.selectedFile, this.selectedFile.name);
   this.hotelService.addHotelPicture(id,uploadProfileImage).subscribe(
   (res:any)=>{
  
    this.snackBar.open(res.message, 'Dismiss', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['success-snackBar'],
    });
    this.refresh();
  //  this.isLoading = false;
  
   },
   err =>{
   this.progress = 0;
   this.snackBar.open(err.body.message,'Dismiss',{
   duration: 4000,
   verticalPosition: 'bottom',
   horizontalPosition: 'right',
   panelClass:['red-snackBar'],
   });
   
    setTimeout(()=>{
   window.location.reload();
   },5000)
   }
   );
   
    }

    uploadHotelDocument(id:any){
      // this.isLoading = true;
     const uploadHotelDoc:FormData = new FormData();
     uploadHotelDoc.append('hotelDocument',this.selectedFile, this.selectedFile.name);
     this.hotelService.addHotelDocument(id,uploadHotelDoc).subscribe(
     (res:any)=>{
    
      this.snackBar.open(res.message, 'Dismiss', {
        duration: 4000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['success-snackBar'],
      });
      // this.refresh();
    //  this.isLoading = false;
    
     },
     err =>{
     this.progress = 0;
     this.snackBar.open(err.body.message,'Dismiss',{
     duration: 4000,
     verticalPosition: 'bottom',
     horizontalPosition: 'right',
     panelClass:['red-snackBar'],
     });
     
      setTimeout(()=>{
     window.location.reload();
     },5000)
     }
     );
     
      }



}
