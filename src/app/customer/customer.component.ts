import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  totalRecords : any;
  page: number = 1;

  isCustomerDetail:boolean =false;
  isInactiveCustomer:boolean=false;
  value:any;
  activeCustomerDetail:any;
  customerDetail: any;
  inactiveCustomerDetail: any;

  userId:any;
  fullname:any;
  username:any;
  address:any;
  gender:any;
  email:any;
  idType:any;
  idNumber:any;
  phone:any;
  age:any;

  popoverTitle:string="Are you sure you want to delete?";
  popoverMessage:string="You can not undo this operation after you confirm to delete.";
  cancelClicked=false;

  constructor( private userService : UserService,
                      private snackBar : MatSnackBar,
                      private activatedRouter : ActivatedRoute

                     ) { }

  ngOnInit(): void {
    this.value=this.activatedRouter.snapshot.params.id;
    
    if(this.value =="active-customer"){
    this.viewActiveCustomer();
    }

    if(this.value =="inactive-customer"){
      this.viewInactiveCustomer();
    }
  }

key:string='id';
reverse:boolean=false;
sort(key:string){​​​​​
this.key=key;
this.reverse= !(this.reverse);
}​​​​​

viewActiveCustomer(){
  this.userService.getActiveUser().subscribe(
    res =>{
      console.log(res);
      this.customerDetail = res;
      this.isCustomerDetail=true;
      this.inactiveCustomerDetail=false;

    },
    err=>{
      console.log(err);
      
    }
  )
}

viewInactiveCustomer(){
  this.userService.getInactiveUser().subscribe(
    res=>{
      console.log(res);
      this.inactiveCustomerDetail=res;
      this.isInactiveCustomer=true;
      this.isCustomerDetail=false;
    },
    err=>{
      console.log(err);
      
    }
  );
}

//reload the page
refresh() {
  window.location.reload();
}

//auto filled data on the edit customer detail form
activeCustomerClicked(id:any){
 
  this.userService.getCustomerById(id).subscribe(
   
    (res)=>{
      
      this.activeCustomerDetail=res;
      this.fullname=res.fullname;
      this.username=res.username;
      this.address=res.address;
      this.email=res.email;
      this.phone=res.phone;
      this.idType=res.idType;
      this.idNumber=res.idNumber;
      this.age=res.age;
      this.gender=res.gender;
      this.userId=res.id;
      
    },
    (err)=>{
      console.log(err);
    }

  );

}

//Edit active customer detail
editActiveCustomer(id:any){ 
  this.userService.editActiveCustomer(id,this.fullname,this.address,this.gender,this.idType,this.idNumber,this.phone,this.age).subscribe(
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

  //delete Customer detail
  deleteCustomer(id: any) {
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
  changeActiveStatusOfCustomer(id:number){
    this.userService.updateActiveStatusOfCustomer(id).subscribe(
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
