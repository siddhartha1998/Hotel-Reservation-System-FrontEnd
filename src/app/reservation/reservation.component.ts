import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Reservation } from './reservation.model';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

page:number=1;
totalRecords:any;
reservationDetail:any;
value:any;
fullname:any;
resId:any;
hotelId:any;
customerId:any;
  hotelName:any;
   hotelUsername:any;
    roomNumber:any;
    roomType:any;
    description:any;
   active:any;
    customer:any;
    checkInDate:any;
    checkOutDate:any;
    noOfGuest:any;
   totalPrice:any;
   reservationTime:any;
   reservedBy:any;
   searchResult:any;
   hotelDetail:any;
   customerDetail:any;
   roomDetail:any;
   roomId:any;
   nonReservedRoom:any;

   isReservedRoom:boolean=false;
   isNonReservedRoom:boolean=false;
   
showDeleteButtonForReservation:boolean=false;
showDeleteButtonForTemporaryReservation:boolean=false;
showViewButtonForReservation:boolean=false;
showViewButtonForTemporaryReservation:boolean=false;
showSubmitButton:boolean=false;
showCheckOutButton:boolean=false;
showEditButtonForTemporaryReservation:boolean=false;
showEditButtonForReservation:boolean=false;
showReserveRoomButton:boolean=false;


popoverTitle:string="Are you sure you want to delete?";
  popoverMessage:string="You can not undo this operation after you confirm to delete.";
  cancelClicked=false;
  popoverTitle1:string="Are you sure you want to confirm to reservation?";
  popoverMessage1:string="You can not undo this operation after confirm it.";
  popoverTitle2:string="Are you sure you want to check Out?";
  popoverMessage2:string="You can not undo this operation after confirm it.";

  constructor(private userService : UserService , 
                      private activatedRoute : ActivatedRoute,
                      private snackBar : MatSnackBar) { }

  // reservationObj : Reservation = new Reservation();
  reservationObj:Array<Reservation> = new Array<Reservation>();

  ngOnInit(): void {
    this.value= this.activatedRoute.snapshot.params.id;

    if(this.value=="temporary-reservation"){
    this.viewTemporaryReservation();
    }

    if(this.value=="reservation"){
      this.viewReservedRoom();
    }

    if(this.value=="non-reserved-room"){
      this.viewNonReservesRoom();
    }
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

  viewTemporaryReservation(){
    this.userService.getTemporaryReservationDetail().subscribe(
      (res:any)=>{
        this.reservationObj=res;
        this.showDeleteButtonForTemporaryReservation=true;
        this.showDeleteButtonForReservation=false;
        this.showViewButtonForReservation=false;
        this.showViewButtonForTemporaryReservation=true;
        this.showSubmitButton=true;
        this.showCheckOutButton=false;
        this.showEditButtonForTemporaryReservation=true;
        this.showEditButtonForReservation=false;
        this.isReservedRoom=true;
        this.isNonReservedRoom=false;
        
        // console.log(res);
        
      },
      (err:any)=>{
        console.log(err);
        
      }
    );
  }

  viewReservedRoom(){
    this.userService.getReservedRoom().subscribe(
        (res:any)=>{
          this.reservationObj=res;
          this.showDeleteButtonForReservation=true;
          this.showDeleteButtonForTemporaryReservation=false;
          this.showViewButtonForReservation=true;
          this.showViewButtonForTemporaryReservation=false;
          this.showSubmitButton=false;
          this.showCheckOutButton=true;
          this.showEditButtonForReservation=true;
          this.showEditButtonForTemporaryReservation=false;
          this.isReservedRoom=true;
          this.isNonReservedRoom=false;
          
          // console.log(res);
          
        },
        (err:any)=>{
          console.log(err);
          
        }
    );
  }

  viewNonReservesRoom(){
    this.userService.getNonReservedRoom().subscribe(
      res=>{
        this.nonReservedRoom=res;
        this.isReservedRoom=false;
        this.isNonReservedRoom=true;
        // console.log(res);
        
      },
      err=>{
        console.log(err);
        
      }
    )
  }

  viewClicked(id:any){
    this.userService.getReservedRoomById(id).subscribe(
      res=>{
        this.reservationDetail=res;
        this.resId=res.id;
        this.hotelName=res.hotelName;
        this.roomNumber=res.roomNumber;
        this.checkInDate=res.checkInDate;
        this.checkOutDate=res.checkOutDate;
        this.noOfGuest=res.noOfGuest;
        this.fullname=res.customer.fullname;
        
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
       this.reservedBy=res.reservedBy;
       this.noOfGuest=res.noOfGuest;
       this.fullname=res.customer.fullname;
        
      },
      err=>{
        console.log(err);
        
      }
    );
  }

  viewNonReservedRoomClicked(id:any){
    this.userService.getRoomDetailById(id).subscribe(
      res=>{
        // console.log(res.description);
        this.nonReservedRoom=res;
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

  editReservation(id:any){
    this.userService.editReservationDetail(id,this.noOfGuest,this.checkInDate,this.checkOutDate).subscribe(
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

  editTemporaryReservation(id:any){
    this.userService.editTemporaryReservation(id,this.noOfGuest,this.checkInDate,this.checkOutDate).subscribe(
      res=>{
        console.log(res);
        
      },
      err=>{
        console.log(err);
        
      }
    )
  }

  deleteReservation(id:any){
    this.userService.deleteReservationById(id).subscribe(
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
        console.log(err);
        
      }
    )

  }

  search(){
    if(this.searchResult == ""){
      this.ngOnInit();
    }else{
      this.reservationObj=this.reservationObj.filter((res:any) =>{
      
        if(res.roomNumber.toString().toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
        return res.roomNumber.toString().toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase());
        }

        // if(res.fullname.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
        //   return res.fullname.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())
        // }
        if(res.checkInDate.toString().toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
          return res.checkInDate.toString().toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase());
          }  

      });
    }
  }

  changeHotelnameHandler(event:any){
    this.hotelId=event.target.value;
    this.getRoomByHotelId(this.hotelId);
    // this.roomReserved(this.hotelId,this.roomId,this.customerId);
    
  }

  changeCustomerNameHandler(event:any){
    this.customerId=event.target.value;
    // this.roomReserved(this.hotelId,this.roomId,this.customerId)
    
  }

  changeRoomNumberHandler(event:any){
    this.roomId=event.target.value;
    // this.roomReserved(this.hotelId,this.roomId,this.customerId);
  }

  getHotelDetail(){
    this.userService.getAllHotel().subscribe(
      res=>{
        this.hotelDetail=res;
        this.hotelId=res.id;
        console.log(res);
        this.getCustomerDetail();
        this.getRoomByHotelId(this.hotelId);
      },
      err=>{
        console.log(err);
        
      }
    )
  }

  getCustomerDetail(){
    this.userService.getActiveUser().subscribe(
      res=>{
        this.customerDetail=res;
        // console.log(res);
        
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
        // console.log(res);
        
      },
      err=>{
        console.log(err);
        
      }
    )
  }

  roomReserved(){
    this.userService.newReservation(this.hotelId,this.roomId,this.customerId,this.hotelName,this.roomNumber,this.fullname,
      this.checkInDate,this.checkOutDate,this.noOfGuest).subscribe(
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
