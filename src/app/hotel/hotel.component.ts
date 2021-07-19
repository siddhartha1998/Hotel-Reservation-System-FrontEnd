import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../_services/hotel.service';
import { LocationService } from '../_services/location.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Hotel } from './hotel.model';


@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  totalRecords : any;
  page: number = 1;
  searchResult:any;
  roles:any[]=[];

  form: any = {};
  isSuccessful = false;
  isAddHotelFailed = false;
  errorMessage = '';
  response:any;
  hotelDetail:any;
  isHotelDetail:any;
  isInactiveHotel:any;
  isMyHotel:any;
  inactivehotelDetail:any;
  editHotelDetail:any;
  myhotelDetail:any;

  registeredHotel:Array<Hotel> = new Array<Hotel>();
 
  userId:any;
  userDetail:any[]=[];
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
  status:any;
  latitude:any;
  longitude:any;
  amenities:any;
  showAddHotelButton:boolean=false;

  selectedFile:any;
  isSelectedFile:boolean=false;
  progress:any;
  currentUser:any;
  hotelDocumentDetail:any;
  uploadDir:any;
  retrievedDocument:any;

  popoverTitle:string="Are you sure you want to delete?";
  popoverMessage:string="You can not undo this operation after you confirm to delete.";
  cancelClicked=false;

  constructor(private userService : UserService,
                      private activatedRouter  :ActivatedRoute,
                      private snackBar : MatSnackBar,
                      private locationService : LocationService,
                      private hotelService : HotelService,
                      private tokenStorage : TokenStorageService
              ) { }

  ngOnInit(): void {
    this.currentUser=this.tokenStorage.getUser();
    this.value=this.activatedRouter.snapshot.params.id;
    this.locationService.getPosition().then(pos=>
      {
        // `Positon: ${pos.lng} ${pos.lat}`
        this.longitude=`${pos.lng}`;
        this.latitude=`${pos.lat}`;
        // console.log(`Positon: ${pos.lng} ${pos.lat}`);
     
         
      });
    // console.log(this.value);
    if(this.currentUser.roles.includes('ROLE_ADMIN')){
    if(this.value == "activeHotel"){
      
        this.viewActiveHotel();
    }

    if(this.value == "inactiveHotel"){

        this.viewInactiveHotel();
    }
  }
   if(this.currentUser.roles.includes('ROLE_HOTEL')){
     if(this.value=="myHotel"){
    // this.getHotel();
   } 
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


search(){
  if(this.searchResult == ""){
    this.ngOnInit();
  }else{
    this.hotelDetail=this.hotelDetail.filter((res:any) =>{
      //console.log(res);

      if(res.hotelName.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
      return res.hotelName.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase());
      }
      if(res.hotelAddress.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
        return res.hotelAddress.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())
      }
      if(res.city.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
        return res.city.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase());
        }
        
    });
  }
}


      viewActiveHotel(){
        this.userService.getActiveHotel().subscribe(
          (res) => {
            this.hotelDetail = res;
            this.isHotelDetail = true;
            this.isInactiveHotel=false;
            this.isMyHotel=false;
            this.showAddHotelButton=true;
          },
          (err) => {
            console.log(err);
          }
        );
      }

      viewUserAuthentication(){
          this.registeredHotel = new Array<Hotel>();
        this.userService.getRegisteredUser().subscribe(
          res=>{
           // this.userDetail=res;
           for (let i = 0; i< res.length; i++) {

            if(res[i].roles[0].name == "ROLE_HOTEL"){

            
              this.registeredHotel.push(res[i]);
            }
       
           }
           
          },
          err=>{
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
        this.isMyHotel=false;
       this.showAddHotelButton=false;

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
        this.phone = res.phone;
        this.latitude=res.latitude;
        this.longitude=res.longitude;
        this.hotelId=res.id;
       this.amenities="free parking, Air Conditioning,  free WiFi"
        
      },
      err =>{
        console.log(err);
      }
    );
  }

  changeUsernameHandler(event:any){
    this.userId=parseInt(event.target.value);
  }

  addHotelDetail(){ 
    this.userService.addHotelDetails(this.userId,this.hotelName,this.hotelOwner,this.city, this.hotelAddress,this.phone,
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
  
    this.userService.editHotelDetail(id,this.hotelName,this.hotelOwner,this.city,this.hotelAddress,this.panNumber,this.phone,this.latitude, this.longitude, this.description).subscribe(
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

  selectFileHandler(event:any){
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
   this.userService.addHotelPicture(id,uploadProfileImage).subscribe(
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
     this.userService.addHotelDocument(id,uploadHotelDoc).subscribe(
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

      
      getHotelDocument(id:any){      
            this.hotelService.getDocumentOfHotel(id).subscribe(
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
                this.retrievedDocument = null;
                console.log(err);
                // this.showHotelDocument=false;
              }
            );
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
    }
  
