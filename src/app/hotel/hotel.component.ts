import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  totalRecords : any;
  page: number = 1;

  form: any = {};
  isSuccessful = false;
  isAddHotelFailed = false;
  errorMessage = '';
  response:any;
  hotelDetail:any;
  isHotelDetail:any;
  isInactiveHotel:any;
  inactivehotelDetail:any;
  editHotelDetail:any;
 
 value:any;
 hotelId:any;
 hotelName:any;
 hotelUsername:any;
  hotelOwner:any;
  city:any;
  hotelAddress:any;
  phone:any;
  panNumber:any;
  document:any;
  description:any;
  latitude:any;
  longitude:any;

  popoverTitle:string="Are you sure you want to delete?";
  popoverMessage:string="You can not undo this operation after you confirm to delete.";
  cancelClicked=false;

  constructor(private userService : UserService,
                      private activatedRouter  :ActivatedRoute,
                      private snackBar : MatSnackBar
              ) { }

  ngOnInit(): void {

    this.value=this.activatedRouter.snapshot.params.id;
    console.log(this.value);
    if(this.value == "activeHotel"){
      
        this.viewActiveHotel();
    }

    if(this.value == "inactiveHotel"){

        this.viewInactiveHotel();
    }

    
  } // end ngonit

  onSubmit(): void {
   
      }

      //sorting list
    key:string='id';
    reverse:boolean=false;
    sort(key:string){​​​​​
    this.key=key;
    this.reverse= !(this.reverse);
}
  
  howIsThis(){
  }

      viewActiveHotel(){
        this.userService.getAllHotel().subscribe(
          (res) => {
            this.hotelDetail = res;
            this.isHotelDetail = true;
            this.isInactiveHotel=false;
          },
          (err) => {
            console.log(err);
          }
        );
      }

       //view all inactive hotels
  viewInactiveHotel() {
    this.userService.getInactiveHotel().subscribe(
      (res) => {
         this.inactivehotelDetail = res;
        this.isInactiveHotel = true;
        this.isHotelDetail = false;
       

      },
      (err) => {
        console.log(err);
      }
    );
   }

   //reload the page
  refresh() {
    window.location.reload();
  }

   //eye view active hotel
   HotelClicked(id:any){
    this.userService.getHotelById(id).subscribe(
      res =>{
        
        this.editHotelDetail=res;
        this.city= res.city;
        this.hotelName= res.hotelName;
        this.hotelOwner = res.hotelOwner;
        this.hotelAddress= res. hotelAddress;
        this.hotelUsername = res. hotelUsername;
        this.description = res. description;
        this.panNumber = res.panNumber;
        this.document=res.document;
        this.phone = res.phone;
        this.hotelId=res.id;
        console.log(this.editHotelDetail);
      },
      err =>{
        console.log(err);
      }
    );
  }

  //edit active Hotel
  editHotel(id:any){
  
    this.userService.editHotelDetail(id,this.hotelName,this.hotelOwner,this.city,this.hotelAddress,this.panNumber,this.document,this.phone,this.description).subscribe(
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

  //delete active Hotel
   deleteHotel(id: any) {
    this.userService.delete(id).subscribe(
      (res) => {
        this.snackBar.open(res.message, 'Dismiss', {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['red-snackBar'],
        });
        this.refresh();
      },
      (err) => {
        console.log(err);
      }
    );
  }

   //edit inactive hotel to active hotel
   changeActiveStatus(id:number){
    this.userService.updateActiveStatus(id).subscribe(
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
    );

  }
    }
  
