import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../_services/hotel.service';
import { LocationService } from '../_services/location.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

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
  status:any;
  aminities:any;

  value:any;
  uploadDir:any;
  retrievedImage:any;
  selectedFile:any;
  isSelectedFile:any;
  progress:any;
  retrievedDocument:any;
  hotelDocumentDetail:any;

  showAddHotelDetailButton:boolean=false;
  showHotelDocument:boolean=false;
  constructor( private hotelService : HotelService,
                      private snackBar : MatSnackBar,
                      private activatedRouter : ActivatedRoute,
                      private location : Location,
                      private locationService : LocationService,
                      private tokenStorageService : TokenStorageService,
                      private userService : UserService
                    )
                 { }

  ngOnInit(): void {
    this.currentUser=this.tokenStorageService.getUser();
    this.hotelUsername=this.currentUser.username; 
    this.value=this.activatedRouter.snapshot.paramMap.get("id");
    this.getHotel();
    this.locationService.getPosition().then(pos=>
      {
        // `Positon: ${pos.lng} ${pos.lat}`
        this.longitude=`${pos.lng}`;
        this.latitude=`${pos.lat}`;
        // console.log(`Positon: ${pos.lng} ${pos.lat}`);
     
         
      });
  }

  backClicked(){
    this.location.back();
    
  }
   // For role hotel
       
   getHotel(){
    this.hotelService.getHotelById(this.value).subscribe(
      res=>{
        console.log(res);
        if(res==null){
          this.showAddHotelDetailButton=true;
        }else{
          this.showAddHotelDetailButton=false;
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
     this.aminities="free parking,  Air conditioning,  free wifi";
        }  
      },
      err=>{
        console.log(err);
        
      }
    );
  }

  addHotelDetail(){   
       this.hotelService.addHotelDetails(this.currentUser.id,this.hotelUsername,this.hotelName,this.hotelOwner,this.city, this.hotelAddress,this.phone,
         this.panNumber, this.status,this.description,this.latitude,this.longitude
         ).subscribe(
       res=>{
         this.snackBar.open(res.message, 'Dismiss', {
           duration: 4000,
           verticalPosition: 'bottom',
           horizontalPosition: 'right',
           panelClass: ['success-snackBar'],
   
         });
         this.refresh();
         
       },
       err=>{
         this.snackBar.open(err.message, 'Dismiss', {
           duration: 4000,
           verticalPosition: 'bottom',
           horizontalPosition: 'right',
           panelClass: ['red-snackBar'],
   
         });
         this.refresh();
         
       }
       );
     }

    //edit active Hotel
    editHotel(id:any){
      this.hotelService.editHotelDetail(id,this.hotelName,this.hotelOwner,this.city,this.hotelAddress,
        this.panNumber,this.phone,this.latitude,this.longitude,this.description).subscribe(
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

      getMyHotelDocument(){
        this.hotelService.getHotelById(this.value).subscribe(
          res=>{
           // console.log(res);
            this.hotelId=res.id
            this.hotelService.getDocumentOfHotel(this.hotelId).subscribe(
              res=>{
                console.log(res);
                
                this.hotelDocumentDetail=res;
               
                   this.uploadDir = res[0].uploadDir;
                   console.log(this.uploadDir);
                   
                  if(this.uploadDir!=null){
                  this.hotelService.loadHotelDocument(this.uploadDir).subscribe(
                   res=>{
                     console.log("getting doc..");
                        console.log(res);
                        this.createDocumentFromBlob(res);
                 
                    },
                    err=>{
                      console.log(err);
                    }
                  );
                    }
            
              
             
              },
              err=>{
                this.retrievedImage = null;
                console.log(err);
                this.showHotelDocument=false;
              }
            
            );
        
          },
          err=>{
            console.log(err);
            
          }
        )
      }

      createDocumentFromBlob(file:Blob){
        let reader=new FileReader();
        reader.addEventListener("load",()=>{
          this.retrievedDocument=reader.result;
         
        },
        false);
        if(file){
          reader.readAsDataURL(file);
        }
      }
  // viewDocument(){

  //   this.hotelService.getDocumentOfHotel(this.value).subscribe(
  //     res=>{
  //       console.log(res);
        
  //       this.hotelDocumentDetail=res;
  //       if(res.length == 0){
  //         // this.showHotelImage = false;
  //       }else{
  
    
  //          this.uploadDir = res.uploadDir;
  //         if(this.uploadDir!=null){
  //         this.hotelService.loadHotelDocument(this.uploadDir).subscribe(
  //          (res:Blob)=>{

  //           let reader=new FileReader();
  //           reader.addEventListener("load",()=>{
  //             this.retrievedDocument=reader.result;
  //             // this.collectionOfHotelDocument[i] = this.retrievedImage;
  //             this.showHotelDocument=true;
  //           },
  //           false);
  //           if(res){
  //             reader.readAsDataURL(res);
  //           }
  //           },
  //           err=>{
  //             console.log(err);
  //           }
  //         );
  //           }
    
  //     }
     
  //     },
  //     err=>{
  //       this.retrievedImage = null;
  //       console.log(err);
  //       this.showHotelDocument=false;
  //     }
    
  //   );

  // }

}
