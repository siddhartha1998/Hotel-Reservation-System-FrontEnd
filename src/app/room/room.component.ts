import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  form:any;
  value:any;
  isSuccessful=false;
  roomDetail:any;
  roomId:any;
  hotelName:any;
  hotelUsername:any;
  roomNumber:any;
  roomType:any;
  roomPhoto:any;
  description:any;
  roomData:any;
  price:any;

  hotelDetail:any;
  hotelId:any;

  page:number=1;
  totalRecords:any;
  searchResult:any;

  selectedFile:any;
  isSelectedFile:boolean=false;
  progress:any;
  currentUser:any;
 
  showDeleteButton:boolean=false;
  showEditButton:boolean=false;
  isRoomDetail:boolean=false;
  showEditButtonOnReserved:boolean=false;
  showEditButtonOnNotReserved:boolean= false;
  showAddRoomPictureButton:boolean=false;
  collectionOfRoomImages:any;


  popoverTitle:string="Are you sure you want to delete?";
  popoverMessage:string="You can not undo this operation after you confirm to delete.";
  cancelClicked=false;
  uploadDir: any;
  id: any;
  retrievedImage: any;
  showRoomImage:boolean=false;

  constructor(private userService : UserService,
                    private activatedRoute : ActivatedRoute,
                    private snackBar : MatSnackBar,
                    private tokenStorageService : TokenStorageService

  ) { }

  ngOnInit(): void {

    this.currentUser=this.tokenStorageService.getUser();

  this.value = this.activatedRoute.snapshot.params.id;

  if(this.value=="all-room"){
    this.viewRoomDetail();

 }
 if(this.value=="active-room"){
  this.getActiveRoom();
 }
 if(this.value=="inactive-room"){
   this.getInactiveRoom();
 }

  }

  onSubmit(){

  }

  refresh(){
    window.location.reload();
  }

       //sorting list
       key:string='id';
       reverse:boolean=false;
       sort(key:string){​​​​​
       this.key=key;
       this.reverse= !(this.reverse);
   }

   changeHotelnameHandler(event:any){
      this.hotelId=event.target.value;
      
   }

   search(){
    if(this.searchResult == ""){
      this.ngOnInit();
    }else{
      this.roomDetail=this.roomDetail.filter((res:any) =>{
      
        if(res.roomNumber.toString().toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
        return res.roomNumber.toString().toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase());
        }

        if(res.roomType.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
          return res.roomType.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())
        }
          
      });
    }
  }

  viewRoomDetail(){
    this.userService.getRoomDetail().subscribe(
      res=>{
        // console.log(res);
        this.roomDetail=res;
      this.showDeleteButton=false;
        this.showEditButtonOnReserved = false;
        this.showEditButtonOnNotReserved = false;
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

  getInactiveRoom(){
    this.userService.getInactiveRoomDetail().subscribe(
      res=>{
        this.roomDetail=res;
       this.showDeleteButton=false;
    this.showEditButtonOnReserved = true;
    this.showEditButtonOnNotReserved = false;
    this.showAddRoomPictureButton=false;
      },
      err=>{
        console.log(err.error);
        
      }
    );
  }

  getActiveRoom(){
    this.userService.getNonReservedRoomDetail().subscribe(
      res=>{
        this.roomDetail=res;
        this.showDeleteButton=true;
        this.showEditButtonOnReserved = false;
        this.showEditButtonOnNotReserved = true;
        this.showAddRoomPictureButton=true;
        
      },
      err=>{

        console.log(err.error);
        
      }
    )
  }

  getHotelById(id:any){
    this.userService.getHotelById(id).subscribe(
      res=>{
        console.log(res.id);
        
      },
      err=>{
        console.log(err);
        
      }
    )
  }

  viewHotelDetail(){
    this.userService.getAllHotel().subscribe(
      res=>{
        this.hotelDetail=res;
       
      },
      err=>{
        console.log(err);
        
      }
    )
  }

  //autoflled data to the modal
  ViewRoomDetailById(id:any){
    this.userService.getRoomDetailById(id).subscribe(
      res=>{
        // console.log(res);
        
        this.roomData=res;
        this.hotelName=res.hotel.hotelName;
        this.hotelUsername=res.hotelUsername;
        this.roomNumber=res.roomNumber;
        this.roomType=res.roomType;
        this.roomPhoto=res.roomPhoto;
        this.description=res.description;
        this.roomId=res.id;
        console.log(this.roomId);
       
        
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

  editActiveRoomDetail(id:any){
this.userService.editRoomById(id,this.roomNumber,this.roomType,this.description).subscribe(
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
  reservedWalaEdit(id:any){
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
      
    )
  }

  addRoomDetail(){
    this.userService.addRoom(this.hotelId,this.roomNumber,this.roomType,this.description).subscribe(
      res=>{
        console.log(res);
      },
      err=>{
        console.log(err);
        
      }
    )
  }

  selectFileHandler(event:any){
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
