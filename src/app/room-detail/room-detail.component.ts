import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../_services/hotel.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  hotelId:any
  page:number=1;
  totalRecords:any;
  value:any;
  currentUser:any;
  roomDetail:any;

  roomId:any;
  hotelName:any;
  hotelUsername:any;
  roomType:any;
  roomNumber:any;
  description:any;

  selectedFile:any;
  isSelectedFile:boolean=false;
  progress:any;

  showDeleteButton:boolean=false;
  showAddRoomPictureButton:boolean=false;
  showEditButtonOfActiveRoom:boolean=false;
  showEditButtonOnReserved:boolean=false;

  popoverTitle:string="Are you sure you want to delete?";
  popoverMessage:string="You can not undo this operation after you confirm to delete.";
  cancelClicked=false;

  constructor( private hotelService : HotelService,
                      private tokenStorageService : TokenStorageService,
                      private snackBar : MatSnackBar,
                      private activatedRouter : ActivatedRoute,
                      private userService : UserService ){ }

  ngOnInit(): void {
    this.currentUser=this.tokenStorageService.getUser();
    this.value=this.activatedRouter.snapshot.params.id;

  if(this.value=="myActive-room"){
    this.viewRoomDetail();
  }
  if(this.value=="myInactive-room"){
    this.viewInactiveRoomDetail();
  }

  }

     //sorting list
     key:string='id';
     reverse:boolean=false;
     sort(key:string){​​​​​
     this.key=key;
     this.reverse= !(this.reverse);
 }

 //refresh page
 refresh(){
   window.location.reload();
 }

 viewRoomDetail(){
  this.hotelService.getHotelById(this.currentUser.id).subscribe(
    res=>{
      this.hotelId=res.id;
      this.hotelService.getRoomDetail(this.hotelId).subscribe(
        res=>{
          this.roomDetail=res;
          this.showDeleteButton=true;
          this.showAddRoomPictureButton=true;
          this.showEditButtonOfActiveRoom=true;
         
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
    },
    err=>{
      console.log(err);
 
    }
  );
}

viewInactiveRoomDetail(){
  this.hotelService.getHotelById(this.currentUser.id).subscribe(
    res=>{
      this.hotelId=res.id
     this.hotelService.getInactiveRoomDetail(this.hotelId).subscribe(
       res=>{
         this.roomDetail=res;
         this.showAddRoomPictureButton=false;
         this.showEditButtonOfActiveRoom=false;
         this.showEditButtonOnReserved=true;
       },
       err=>{
        this.snackBar.open(err.message, 'Dismiss', {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['success-snackBar'],
        });
        this.refresh();
       }
     );
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

viewRoomDetailById(id:any){
  this.hotelService.getRoomDetailById(id).subscribe(
    res=>{
      this.roomDetail=res;
      this.roomId=res.id;
    this.hotelName=res.hotel.hotelName;
    this.hotelUsername=res.hotelUsername;
    this.roomType=res.roomType;
    this.roomNumber=res.roomNumber;
    this.description=res.description;
      
    },
    err=>{
      this.snackBar.open(err.message, 'Dismiss', {
        duration: 4000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['success-snackBar'],
      });
      this.refresh();
      
    }
  )
}

viewMyHotel(){
  this.hotelService.getHotelById(this.currentUser.id).subscribe(
    res=>{
      // console.log(res);
      this.hotelName=res.hotelName;
      this.hotelId=res.id;
      // this.addRoomDetail(this.hotelId)
      
    },
    err=>{
      this.snackBar.open(err.message, 'Dismiss', {
        duration: 4000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['success-snackBar'],
      });
      this.refresh();
      
    }
  )
}

addRoomDetail(id:number){
  this.userService.addRoom(id,this.roomNumber,this.roomType,this.description).subscribe(
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
        panelClass: ['success-snackBar'],
      });
      this.refresh();
      
    }
  )
}

editActiveRoomDetail(id:any){
  this.hotelService.editActiveRoomDetail(id,this.roomType,this.roomNumber,this.description).subscribe(
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
        panelClass: ['success-snackBar'],
      });
      this.refresh();
      
    }
  )
}

changeActiveStatusOfRoom(id:any){
  this.userService.editActiveStatusOfRoom(id).subscribe(
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


deleteRoom(id:any){
  this.userService.deleteRoomById(id).subscribe(
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
  

selectRoomPhotoHandler(event:any){
  this.selectedFile=event.target.files[0];
  this.isSelectedFile=true;
}

uploadRoomPicture(id:any){
// this.isLoading = true;
 const uploadProfileImage:FormData = new FormData();
 uploadProfileImage.append('roomPic',this.selectedFile, this.selectedFile.name);
 this.userService.addRoomProfile(this.currentUser.id,id,uploadProfileImage).subscribe(
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


}