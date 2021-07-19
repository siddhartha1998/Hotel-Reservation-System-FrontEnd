import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../customer/customer.model';
import { HotelService } from '../_services/hotel.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  totalRecords : any;
  page: number = 1;

  currentUser:any;
  value:any;
  registeredUser: Array<Customer>=new Array<Customer>();

  customerId:any
  userId:any;
  hotelId:any;
  customerDetail:any;
  fullname:any;
  address:any;
  username:any;
  idType:any;
  idNumber:any;
  gender:any;
  email:any;
  age:any;
  phone:any;

  isCurrentCustomer:boolean=false;
  isReservedCustomer:boolean=false;
  isCheckoutCustomer:boolean=false;
  isAllCustomerDetail:boolean=false;
  isCustomerDetail:boolean=false;
  showEditButton:boolean=false;
  showDeleteButton:boolean=false;
  showAddCustomerButton:boolean=false;
  popoverTitle:string="Are you sure you want to delete?";
  popoverMessage:string="You can not undo this operation after you confirm to delete.";
  cancelClicked=false;
  constructor(private hotelService : HotelService,
                      private tokenStorageService : TokenStorageService,
                      private activatedRouter : ActivatedRoute,
                      private userService : UserService,
                      private snackBar : MatSnackBar
    ) { }

  ngOnInit(): void {
    this.currentUser=this.tokenStorageService.getUser();
    this.value=this.activatedRouter.snapshot.params.id;
    if(this.value=="all-customer"){
       this.getAllCustomer(); 
    }
    if(this.value=="current-customer"){
      this.isCurrentCustomer=true;
      this.viewHotelDetail();
    }
    if(this.value=="reserved-customer"){
      this.isReservedCustomer=true;
      this.viewHotelDetail();
    }
    if(this.value=="checkout-customer"){
        this.isCheckoutCustomer=true;
        this.viewHotelDetail();
    }
    
  }

  key:string='id';
reverse:boolean=false;
sort(key:string){​​​​​
this.key=key;
this.reverse= !(this.reverse);
}​​​​​

refresh(){
  window.location.reload();
}

viewHotelDetail(){
  this.hotelService.getHotelById(this.currentUser.id).subscribe(
    res=>{
     this.hotelId=res.id; 
     if(this.isCurrentCustomer==true){
      this.getCurrentCustomer(this.hotelId);
     }
     if(this.isReservedCustomer==true){
      this.getReservedCustomer(this.hotelId);
     }
     if(this.isCheckoutCustomer==true){
        this.getCheckoutCustomer(this.hotelId);
        this.getDistinctCustomer(this.hotelId)
     }
    },
    err=>{
      console.log(err);
      
    }
  );
}

getAllCustomer(){
  this.userService.getActiveCustomer().subscribe(
    res=>{
      console.log(res);
      this.customerDetail=res;
      this. showAddCustomerButton=true;
      this.isAllCustomerDetail=true;
    },
    err=>{
      console.log(err);
    }
  )
}

getCurrentCustomer(id:number){
this.hotelService.getReservation(id).subscribe(
  res=>{
    console.log(res);
    this.customerDetail=res;
    this.isCustomerDetail=true;
    // this.showEditButton=true;
    // this.showDeleteButton=true;
  },
  err=>{
    console.log(err);
    
  }
);
}

getReservedCustomer(id:number){
 this.hotelService.getReservedCustomer(id).subscribe(
   res=>{
     console.log(res);
      this.customerDetail=res;
      this.isCustomerDetail=true;
   },
   err=>{
     console.log(err);
     
   }
 );
}

getCheckoutCustomer(id:number){
  this.hotelService.getCheckOutCustomer(id).subscribe(
    res=>{
      this.customerDetail=res;
      this.isCustomerDetail=true;
      // console.log(res);
      
    },
    err=>{
    console.log(err);
    }
  );
}

getDistinctCustomer(id:number){
 this.hotelService.findDistinctCheckOutCustomer(id).subscribe(
   res=>{
     console.log(res);
   },
   err=>{
     console.log(err);
     
   }
 );
}

customerClicked(id:any){
 this.hotelService.getCustomerById(id).subscribe(
   res=>{
     console.log(res);
     this.customerId=res.id;
     this.fullname=res.fullname;
     this.username=res.username;
     this.email=res.email;
     this.address=res.address;
     this.phone=res.phone;
     this.gender=res.gender;
     this.idType=res.idType;
     this.idNumber=res.idNumber;
     this.age=res.age;
     
   },
   err=>{
     console.log(err);
     
   }
 );
}

viewUserAuthentication(){
  this.registeredUser = new Array<Customer>();
this.userService.getRegisteredUser().subscribe(
  res=>{
   // this.userDetail=res;
   for (let i = 0; i< res.length; i++) {

    if(res[i].roles[0].name == "ROLE_CUSTOMER"){

      this.registeredUser.push(res[i]);
      console.log(this.registeredUser);
      
    }
   }
  },
  err=>{
    console.log(err);
  }
);
}

changeGenderHandler(event:any){
  this.gender=event.target.value;
}

changeUsernameHandler(event:any){
  this.userId=event.target.value;
}

addCustomer(){
  this.userService.addCustomerDetail(this.userId,this.fullname,this.address,this.gender,
    this.idType,this.idNumber,this.phone,this.age).subscribe(
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

editActiveCustomer(id:any){
  this.userService.editActiveCustomer(id,this.fullname,this.address,this.gender,this.idType,
    this.idNumber,this.phone,this.age).subscribe(
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
  );
}

deleteCustomer(id:any){
  this.userService.customerDelete(id).subscribe(
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

  //change active status of inactive customer
  // changeActiveStatusOfCustomer(id:number){
  //   this.userService.updateActiveStatusOfCustomer(id).subscribe(
  //     res =>{

  //       this.snackBar.open(res.message, 'Dismiss', {
  //         duration: 4000,
  //         verticalPosition: 'bottom',
  //         horizontalPosition: 'right',
  //         panelClass: ['success-snackBar'],
  
  //       });
  //       this.refresh();
        
  //     },
  //     err =>{
  //       console.log(err);
  //     }
  //   );
  // }

}
