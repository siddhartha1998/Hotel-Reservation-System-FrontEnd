import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../_services/hotel.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {

  page:number=1;
  totalRecords:any;

  currentUser:any;
  hotelId:any;
  value:any
  tempReservationObj:any;
  roomDetail:any;
  customerDetail:any;
  hotelDetail:any;

  hId:any;
  customerId:any;
  roomId:any;
  reservationDetail:any;
  resId:any;
  hotelName:any;
  reservationTime:any;
  checkInDate:any;
  checkOutDate:any;
  noOfGuest:any;
  idType:any;
  idNumber:any;
  roomNumber:any;
  roomType:any;
  fullname:any;
  description:any;

  tempReserve:boolean = false;
  reserve:boolean=false;
  nonReserve:boolean=false;
  showCheckInDate:boolean=false

  isReservation:boolean=false;
  isTemporaryReservation:boolean=false;
  isNonReservedRoom:boolean=false;

  popoverTitle:string="Are you sure you want to delete?";
  popoverMessage:string="You can not undo this operation after you confirm to delete.";
  cancelClicked=false;
  popoverTitle1:string="Are you sure you want to confirm to reservation?";
  popoverMessage1:string="You can not undo this operation after confirm it.";
  popoverTitle2:string="Are you sure you want to check Out?";
  popoverMessage2:string="You can not undo this operation after confirm it.";

  constructor( private tokenStorageService : TokenStorageService,
                      private hotelService : HotelService,
                      private activatedRouter : ActivatedRoute,
                      private userService : UserService,
                      private snackBar : MatSnackBar
    ) { }

  ngOnInit(): void {
    this.currentUser=this.tokenStorageService.getUser();  
    this.value=this.activatedRouter.snapshot.params.id;
     if(this.value=="temporary-reservation"){
           this.getHotelDetail();
            this.tempReserve = true;
            this.reserve=false;
            this.nonReserve=false;
           
     }
     if(this.value=="reservation"){
            this.getHotelDetail();
            this.reserve=true;
            this.tempReserve=false;
            this.nonReserve=false;
     
     }
     if(this.value=="non-reserved-room"){
            this.getHotelDetail();
            this.tempReserve=false;
            this.reserve=false;
            this.nonReserve=true;
        
     }

  }

    //sorting list
    key:string='id';
    reverse:boolean=false;
    sort(key:string){​​​​​
    this.key=key;
    this.reverse= !(this.reverse);
}

refresh(){
  window.location.reload();
}

getHotelDetail(){
  this.hotelService.getHotelById(this.currentUser.id).subscribe(
    res=>{
              if(this.tempReserve ==  true){
                this.getTemporaryReservation(res.id);
              }
              if(this.reserve == true){
                this.getReservation(res.id);
              }
              if(this.nonReserve == true){
                this.getNonReservedRoom(res.id)
              }
            
      
    },
    err=>{
      console.log(err);
      
    }
  );
}
getTemporaryReservation(id:number){
  this.hotelService.getTemporaryReservation(id).subscribe(
    res =>{
      console.log(res);
      
      this.tempReservationObj = res;
      this.isTemporaryReservation = true;
      this.isReservation=false;
      this.isNonReservedRoom=false;
    },
    err =>{
      console.log(err);
    }
  );
}

getReservation(id:number){
  this.hotelService.getReservation(id).subscribe(
    res=>{  
      console.log(res);
      this.tempReservationObj=res;
      this.isTemporaryReservation=false;
      this.isReservation=true;
      this.isNonReservedRoom=false;
    },
    err=>{
      console.log(err);
      
    }
  )
}

getNonReservedRoom(id:number){
  this.hotelService.getNonReservedRoom(id).subscribe(
    res=>{
      console.log(res);
      this.tempReservationObj=res;
      this.isTemporaryReservation=false;
      this.isReservation=false;
      this.isNonReservedRoom=true;
      
    },
    err=>{
      console.log(err);
      
    }
  );
}

viewTempClicked(id:number){
  this.userService.getTemporaryReservationById(id).subscribe(
    res=>{
      this.reservationDetail=res;
      this.resId=res.id;
     this.hotelName=res.hotelName;
     this.roomNumber=res.roomNumber;
     this.reservationTime=res.reservationTime;
     this.checkInDate=res.checkInDate;
     this.checkOutDate=res.checkOutDate;
     this.noOfGuest=res.noOfGuest;
     this.fullname=res.customer.fullname;
      this.idType=res.idType;
      this.idNumber=res.idNumber;
     this.showCheckInDate=false;
      
    },
    err=>{
      console.log(err);
    }
  );
}

viewClicked(id:any){
  this.userService.getReservedRoomById(id).subscribe(
    res=>{
      this.reservationDetail=res;
      this.resId=res.id;
      this.hotelName=res.hotelName;
      this.roomNumber=res.roomNumber;
      this.reservationTime=res.reservationTime;
      this.checkOutDate=res.checkOutDate;
      this.noOfGuest=res.noOfGuest;
      this.fullname=res.customer.fullname;
      this.checkInDate=res.checkInDate;
      this.idType=res.idType;
      this.idNumber=res.idNumber;
      
      this.showCheckInDate=true;
    },
    err=>{
      console.log(err);
      
    }
  );
}

nonReservedRoomClicked(id:any){
  this.hotelService.getRoomDetailById(id).subscribe(
    res=>{
      // console.log(res.description);
      this.reservationDetail=res;
      this.hotelName=res.hotel.hotelName;
      this.roomType=res.roomType;
      this.roomNumber=res.roomNumber;
      this.description= res.description;
      
    },
    err=>{
      console.log(err);
      
    }
  )
}
     
editTemporaryReservation(id:any){
  this.userService.editTemporaryReservation(id,this.noOfGuest,this.checkInDate,this.checkOutDate,this.idType,this.idNumber).subscribe(
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
      console.log(err);
      
    }
  )
}

deleteTemporaryReservation(id:any){
  this.userService.deleteTemporaryReservation(id).subscribe(
    res=>{
      console.log(res);
      this.snackBar.open(res.message, 'Dismiss', {
        duration: 4000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['success-snackBar'],
  
      });
      this.refresh();
    },
    err=>{
      console.log(err);
      
    }
  )
}

editReservation(id:any){
  this.userService.editReservationDetail(id,this.noOfGuest,this.checkInDate,this.checkOutDate,this.idType,this.idNumber).subscribe(
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
      console.log(err);
      
    }
  )
}

// deleteReservation(id:any){
//   this.userService.deleteReservationById(id).subscribe(
//     res=>{
//       this.snackBar.open(res.message, 'Dismiss', {
//         duration: 4000,
//         verticalPosition: 'bottom',
//         horizontalPosition: 'right',
//         panelClass: ['red-snackBar'],
  
//       });
//       this.refresh();
//     },
//     err=>{
//       this.snackBar.open(err.message, 'Dismiss', {
//         duration: 4000,
//         verticalPosition: 'bottom',
//         horizontalPosition: 'right',
//         panelClass: ['red-snackBar'],
  
//       });
//       this.refresh();
//     }
//   );
// }

confirmTemporaryReservation(id:any){
  this.userService.confirmReservation(id).subscribe(
    res=>{
      console.log(res);
      this.snackBar.open(res.message, 'Dismiss', {
        duration: 4000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['red-snackBar'],
  
      });
      this.refresh();
      
    },
    err=>
    {
    console.log(err);
    }
  );
}

checkOutReservation(id:any){
  this.userService.checkOut(id).subscribe(
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
  );
}

changeCustomerNameHandler(event:any){
  this.customerId=event.target.value;
}

changeRoomNumberHandler(event:any){
  this.roomId=event.target.value;
}

getMyHotelDetail(){
  this.hotelService.getHotelById(this.currentUser.id).subscribe(
    res=>{
      console.log(res);
      this.hotelName=res.hotelName;
      this.hotelId=res.id;
      this.getRoomByHotelId(res.id)
      this.getCustomerDetail();
    },
    err=>{
      console.log(err);
      
    }
  );
}

getCustomerDetail(){
  this.userService.getActiveCustomer().subscribe(
    res=>{
      this.customerDetail=res;
      
    },
    err=>{
      console.log(err);
      
    }
  )
}

getRoomByHotelId(hotelId:any){
  this.userService.getRoomDetailByHotelId(hotelId).subscribe(
    res=>{
      this.roomDetail=res;    
    },
    err=>{
      console.log(err);
      
    }
  );
}

roomReserved(){
  this.userService.newReservation(this.hotelId,this.roomId,this.customerId,this.hotelName,this.roomNumber,this.fullname,
    this.checkInDate,this.checkOutDate,this.noOfGuest,this.idType,this.idNumber).subscribe(
      res=>{
        this.snackBar.open(res.message, 'Dismiss', {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['success-snackBar'],
        });
        // this.refresh();
        this.ngOnInit();
        
      },
      err=>{
        console.log(err);
        
      }
    )
}


}
